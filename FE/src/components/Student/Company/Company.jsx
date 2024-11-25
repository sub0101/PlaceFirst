import React, { useState } from 'react';
import { Typography, Select, Row, Col, Space, Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAllCompanyApplications } from '../../../react query/api/company';
import CompanyCard from './CompanyCard';

const { Title } = Typography;
const { Option } = Select;

const Company = () => {
  const [filter, setFilter] = useState('all');
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ['applications'],
    queryFn: getAllCompanyApplications
  });
console.log(applications)
  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    console.log(error)
    return <Alert message="Error loading companies" type="error" />;
  }

  const filteredApplications = applications?.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>Companies</Title>
        </Col>
        <Col>
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={(value) => setFilter(value)}
          >
            <Option value="all">All Companies</Option>
            <Option value="ongoing">Ongoing</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {filteredApplications?.map((company) => (
          <Col xs={24} sm={12} lg={8} key={company.id}>
           
            <CompanyCard
              title={company.name}
              status={company.companyApplication.applicationStatus}
              type={company.industry}
              ctc={company.companyApplication.ctc}
              date={company.date}
              applicants={company.applicants}
              canApply={!company.canApply}
              companyId={company.companyApplication.id}
            />
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default Company;