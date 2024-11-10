import React, { useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Typography, Layout, Card, Select, message, Button, Input, Space } from 'antd';
import { FileExcelOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicants, updateApplicant } from '../../../react query/api/applicants';
import PageSkeleton from '../../shared/PageSkeleton';
import { exportToExcel } from '../../../helper/exportToExcel';
import { filterKeys } from '../../../helper/filteredkeys';

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

export default function Applicants() {
  const { id: companyId } = useParams();
  const queryClient = useQueryClient();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('');

  const { data: applicants = [], isLoading, isError } = useQuery({
    queryKey: ["applicants", companyId],
    queryFn: () => getApplicants(companyId),
    enabled: !!companyId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateApplicant,
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants", companyId]);
      message.success('Status updated successfully');
    },
    onError: () => {
      message.error('Failed to update status');
    }
  });

  const handleStatusChange = useCallback((applicantId, newStatus) => {
    updateStatusMutation.mutate({ id: applicantId, status: newStatus });
  }, [updateStatusMutation]);

  const exportExcel = useCallback(() => {
    const data = applicants.map(info => ({
      ...info,
      ...Object.entries(info).reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            acc[`${key}_${subKey}`] = subValue;
          });
        }
        return acc;
      }, {})
    }));
    const filteredData = filterKeys(data);
    exportToExcel(filteredData, "Applicants");
  }, [applicants]);

  const getColumnSearchProps = useCallback((dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      if (typeof dataIndex === 'string') {
        return record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '';
      }
      const [objKey, nestedKey] = dataIndex;
      return record[objKey] && record[objKey][nestedKey]
        ? record[objKey][nestedKey].toString().toLowerCase().includes(value.toLowerCase())
        : '';
    },
  }), []);

  const columns = useMemo(() => {
    if (applicants.length === 0) return [];

    const sampleApplicant = applicants[0];
    const baseColumns = Object.keys(sampleApplicant).filter(key => typeof sampleApplicant[key] !== 'object').map(key => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
      key: key,
      sorter: (a, b) => {
        if (typeof a[key] === 'string') return a[key].localeCompare(b[key]);
        return a[key] - b[key];
      },
      ...getColumnSearchProps(key),
    }));

    const nestedColumns = Object.entries(sampleApplicant)
      .filter(([_, value]) => typeof value === 'object' && value !== null)
      .flatMap(([objectKey, objectValue]) => 
        Object.keys(objectValue).map(key => ({
          title: `${objectKey} ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          dataIndex: [objectKey, key],
          key: `${objectKey}_${key}`,
          render: (text, record) => record[objectKey] ? record[objectKey][key] : '',
          sorter: (a, b) => {
            const aValue = a[objectKey] ? a[objectKey][key] : '';
            const bValue = b[objectKey] ? b[objectKey][key] : '';
            if (typeof aValue === 'string') return aValue.localeCompare(bValue);
            return aValue - bValue;
          },
          ...getColumnSearchProps([objectKey, key]),
        }))
      );

    return [...baseColumns, ...nestedColumns, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
          loading={updateStatusMutation.isLoading}
        >
          <Option value="pending">Pending</Option>
          <Option value="interviewed">Interviewed</Option>  
          <Option value="accepted">Accepted</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      ),
    }];
  }, [applicants, getColumnSearchProps, handleStatusChange, updateStatusMutation.isLoading]);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleBulkStatusUpdate = useCallback(() => {
    if (selectedRowKeys.length === 0 || !bulkStatus) {
      message.warning('Please select applicants and a status to update');
      return;
    }

    Promise.all(
      selectedRowKeys.map(key => 
        updateStatusMutation.mutateAsync({ id: key, status: bulkStatus })
      )
    ).then(() => {
      message.success(`Updated ${selectedRowKeys.length} applicants to ${bulkStatus}`);
      setSelectedRowKeys([]);
      setBulkStatus('');
    }).catch(() => {
      message.error('Failed to update some applicants');
    });
  }, [selectedRowKeys, bulkStatus, updateStatusMutation]);

  if (isLoading) {
    return <PageSkeleton layout="table" itemCount={10} />;
  }

  if (isError) {
    return (
      <Layout className="min-h-screen bg-gray-100">
        <Content className="p-4 sm:p-6 lg:p-8">
          <div className="text-center text-red-500">
            <Text>Error loading applicants. Please try again later.</Text>
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <Button icon={<FileExcelOutlined />} onClick={exportExcel}>Export to Excel</Button>
          <Title level={2} className="mb-4 sm:mb-0">Applicants List</Title>
          <Text strong className="mb-4 sm:mb-0">
            Total Applicants: {applicants.length || 0}
          </Text>
        </div>
        
        <div className="mb-4 flex items-center">
          <Select
            placeholder="Select status for bulk update"
            style={{ width: 200, marginRight: 16 }}
            value={bulkStatus}
            onChange={setBulkStatus}
          >
            <Option value="pending">Pending</Option>
            <Option value="interviewed">Interviewed</Option>
            <Option value="accepted">Accepted</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Button 
            type="primary"
            onClick={handleBulkStatusUpdate}
            disabled={selectedRowKeys.length === 0 || !bulkStatus}
          >
            Update Selected ({selectedRowKeys.length})
          </Button>
        </div>

        <Card className="overflow-x-auto">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={applicants}
            rowKey={(record) => record.id}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </Content>
    </Layout>
  );
}