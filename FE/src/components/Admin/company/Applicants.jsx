import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Table, Typography, Input, Button, Space, Layout, Card, Tag, Avatar, Select } from 'antd';
import { SearchOutlined, UserOutlined, MailOutlined, PhoneOutlined, BookOutlined, BranchesOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getApplicants } from '../../../react query/api/applicants';
import PageSkeleton from '../../shared/PageSkeleton';

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

const Applicants = () => {
  const { id: companyId } = useParams();
  console.log(companyId)
  const location = useLocation();
  const { companyApplication } = location.state || {};

  const [searchText, setSearchText] = useState('');
  const [filterBranch, setFilterBranch] = useState('');

  const { data: applicants, isLoading, isError } = useQuery({
    queryFn: ()=>getApplicants(companyId),
    queryKey: ["applicants"]
  });

  const columns = [
    {
      title: 'Applicant',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{record.Student.name}</Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        <Space>
          <MailOutlined />
          <Text>{record.Student.email}</Text>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => (
        <Space>
          <PhoneOutlined />
          <Text>{record.Student.contact}</Text>
        </Space>
      ),
    },
    {
      title: 'Enrollment',
      dataIndex: 'enrollment',
      key: 'enrollment',
      render: (text, record) => (
        <Space>
          <BookOutlined />
          <Text>{String(record.Student.studentId).toUpperCase()}</Text>
        </Space>
      ),
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (text, record) => (
        <Space>
          <BranchesOutlined />
          <Text>{record.Student.branch.toUpperCase()}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        if (status === 'Accepted') color = 'green';
        if (status === 'Rejected') color = 'red';
        if (status === 'Interviewed') color = 'orange';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => console.log('View applicant:', record.id)}>
          View Details
        </Button>
      ),
    },
  ];

  const filteredApplicants = applicants?.filter(
    (applicant) =>
      (applicant.Student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        applicant.Student.email.toLowerCase().includes(searchText.toLowerCase()) ||
        applicant.Student.contact.includes(searchText) ||
        String(applicant.Student.studentId).toLowerCase().includes(searchText.toLowerCase())) &&
      (filterBranch === '' || applicant.Student.branch.toLowerCase() === filterBranch.toLowerCase())
  );

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
          <Title level={2} className="mb-4 sm:mb-0">Applicants List</Title>
          <Text strong className="mb-4 sm:mb-0">
            Total Applicants: {applicants?.length || 0}
          </Text>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            placeholder="Search applicants"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Filter by Branch"
            style={{ width: '100%', maxWidth: '200px' }}
            onChange={(value) => setFilterBranch(value)}
            allowClear
          >
            <Option value="">All Branches</Option>
            <Option value="MCA">MCA</Option>
            <Option value="CSE">CSE</Option>
            <Option value="ECE">ECE</Option>
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={filteredApplicants}
          rowKey={(record) => record.Student.studentId}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 'max-content' }}
          className="overflow-x-auto"
        />
      </Content>
    </Layout>
  );
};

export default Applicants;