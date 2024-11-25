import React, { useState, useMemo, useCallback, useRef, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Typography, Layout, Card, Select, message, Button, Input, Space, Modal, Tag } from 'antd';
import { FileExcelOutlined, PlusOutlined, MinusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplicants, updateApplicant, updateStatus } from '../../../react query/api/applicants';
import PageSkeleton from '../../shared/PageSkeleton';
import { exportToExcel } from '../../../helper/exportToExcel';
import { filterKeys } from '../../../helper/filteredkeys';

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { confirm } = Modal;

export default function Applicants() {
  const { id: companyId } = useParams();
  const queryClient = useQueryClient();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [bulkStatus, setBulkStatus] = useState('');
  const [filters, setFilters] = useState([]);

  const { data: applicants = [], isLoading, isError } = useQuery({
    queryKey: ["applicants", companyId],
    queryFn: () => getApplicants(companyId),
    enabled: !!companyId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["applicants", companyId]);
      message.success('Status updated successfully');
    },
    onError: () => {
      message.error('Failed to update status');
    }
  });

  const handleStatusChange = useCallback((applicantId, newStatus) => {
    confirm({
      title: 'Are you sure you want to change this applicant\'s status?',
      content: `You are about to change the status to ${newStatus}. This action cannot be undone.`,
      onOk() {
        updateStatusMutation.mutate({ id: applicantId, status: newStatus });
      },
      onCancel() {
        console.log('Status change cancelled');
      },
    });
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

  const flattenObject = useCallback((obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
  }, []);

  const fields = useMemo(() => {
    if (applicants.length === 0) return [];
    const sampleApplicant = flattenObject(applicants[0]);
    return Object.keys(sampleApplicant).map(key => ({
      value: key,
      label: key.split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    }));
  }, [applicants, flattenObject]);

  const handleAddFilter = useCallback(() => {
    setFilters([...filters, { field: '', values: [] }]);
  }, [filters]);

  const handleRemoveFilter = useCallback((index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  }, [filters]);

  const handleFilterFieldChange = useCallback((index, field) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], field, values: [] };
    setFilters(newFilters);
  }, [filters]);

  const handleFilterValueChange = useCallback((index, newValues) => {
    const newFilters = [...filters];
    newFilters[index].values = newValues;
    setFilters(newFilters);
  }, [filters]);

  const handleRemoveFilterValue = useCallback((filterIndex, valueIndex) => {
    const newFilters = [...filters];
    newFilters[filterIndex].values.splice(valueIndex, 1);
    setFilters(newFilters);
  }, [filters]);

  const filteredApplicants = useMemo(() => {
    return applicants.filter(applicant => {
      const flatApplicant = flattenObject(applicant);
      return filters.every(filter => {
        if (!filter.field || filter.values.length === 0) return true;
        const fieldValue = String(flatApplicant[filter.field] || '').toLowerCase();
        return filter.values.some(value => fieldValue.includes(value.toLowerCase()));
      });
    });
  }, [applicants, filters, flattenObject]);

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
        }))
      );

    return [...baseColumns, ...nestedColumns, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record._id, value)}
          style={{ width: 120 }}
          loading={updateStatusMutation.isLoading}
        >
          <Option value="applied">Applied</Option>
          <Option value="interviewed">Interviewed</Option>  
          <Option value="accepted">Accepted</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      ),
    }];
  }, [applicants, handleStatusChange, updateStatusMutation.isLoading]);

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

    confirm({
      title: 'Are you sure you want to update the status of multiple applicants?',
      content: `You are about to change the status of ${selectedRowKeys.length} applicants to ${bulkStatus}. This action cannot be undone.`,
      onOk() {
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
      },
      onCancel() {
        console.log('Bulk status update cancelled');
      },
    });
  }, [selectedRowKeys, bulkStatus, updateStatusMutation]);

  const FilterInput = ({ filter, index }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const addValue = (value) => {
      if (value && !filter.values.includes(value)) {
        handleFilterValueChange(index, [...filter.values, value]);
      }
      setInputValue('');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addValue(inputValue.trim());
      } else if (e.key === 'Backspace' && inputValue === '' && filter.values.length > 0) {
        handleRemoveFilterValue(index, filter.values.length - 1);
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const pastedValues = pastedText.split(/[\s,\n]+/).filter(v => v.trim() !== '');
      const newValues = [...new Set([...filter.values, ...pastedValues])];
      handleFilterValueChange(index, newValues);
    };

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
      if (inputValue.trim()) {
        addValue(inputValue.trim());
      }
    };

    return (
      <div className="relative w-96">
        <div className="flex flex-wrap gap-1 p-1 border rounded bg-white">
          {filter.values.map((value, valueIndex) => (
            <Tag
              key={valueIndex}
              closable
              onClose={(e) => {
                e.preventDefault();
                handleRemoveFilterValue(index, valueIndex);
              }}
              className="m-1"
            >
              {value}
            </Tag>
          ))}
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={handleInputBlur}
            placeholder="Enter or paste values"
            className="flex-grow border-none outline-none"
          />
        </div>
      </div>
    );
  };

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

        <div className="mb-4">
          <Button onClick={handleAddFilter} icon={<PlusOutlined />} className="mb-2">Add Filter</Button>
          {filters.map((filter, index) => (
            <Space key={index} className="mb-2 flex items-center" wrap>
              <Select
                style={{ width: 200 }}
                placeholder="Select field"
                value={filter.field}
                onChange={(value) => handleFilterFieldChange(index, value)}
              >
                {fields.map(field => (
                  <Option key={field.value} value={field.value}>{field.label}</Option>
                ))}
              </Select>
              <FilterInput filter={filter} index={index} />
              <Button onClick={() => handleRemoveFilter(index)} icon={<MinusCircleOutlined />} danger />
            </Space>
          ))}
        </div>

        <Card className="overflow-x-auto">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredApplicants}
            rowKey={(record) => record._id}
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