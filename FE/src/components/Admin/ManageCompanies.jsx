import React, { useState } from 'react';
import { Typography, Select, Table, Button } from 'antd';
import { EditOutlined, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const ManageCompanies = () => {
  const [filter, setFilter] = useState('all');

  const columns = [
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'CTC', dataIndex: 'ctc', key: 'ctc' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button icon={<EditOutlined />} style={{ marginRight: '10px' }}>Edit</Button>
          <Button icon={<CheckCircleOutlined />}>Update Status</Button>
        </>
      ),
    },
  ];

  const data = [
    { key: '1', company: 'INFOSYS', status: 'Upcoming', ctc: '70000', date: '02 Feb 2022' },
    { key: '2', company: 'AMAZON', status: 'Upcoming', ctc: '100000000', date: '18 Jun 2023' },
  ];

  return (
    <>
      <Title level={2}>Manage Companies</Title>
      <div className="flex justify-between items-center mb-4">
        <Select defaultValue="all" style={{ width: 200 }} onChange={(value) => setFilter(value)}>
          <Option value="all">All</Option>
          <Option value="upcoming">Upcoming</Option>
          <Option value="ongoing">Ongoing</Option>
          <Option value="completed">Completed</Option>
        </Select>
        <Link to="/add-company">
          <Button type="primary" icon={<PlusOutlined />}>
            Add New Company
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={data} className="mt-4" />
    </>
  );
};

export default ManageCompanies;
