import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCompanyApplication, updateCompanyStatus } from '../../react query/api/company';
import { 
  Layout, Typography, Card, Row, Col, Statistic, Tag, Descriptions, 
  Avatar, Divider, List, Collapse, Spin, Alert, Switch, message
} from 'antd';
import {
  BuildOutlined as BuildingOutlined, CalendarOutlined, DollarOutlined, TeamOutlined,
  ClockCircleOutlined, BookOutlined, CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const CompanyDetails = () => {
  const { id: companyId } = useParams();
  const queryClient = useQueryClient();
  const [status , setStatus] = useState()

  const { data: company, isLoading, isError } = useQuery({
    queryKey: ['companyApplication', companyId],
    queryFn: () => getCompanyApplication(companyId),
  });
  useEffect(()=>{
    const {applicationStatus } = company || {}
    company && setStatus(applicationStatus)
  } ,[company])

  const updateStatusMutation = useMutation({
    mutationFn: updateCompanyStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['companyApplication', companyId]);
      message.success('Company status updated successfully');
      setStatus((status)=> !status)
    },
    onError: () => {
      message.error('Failed to update company status');
    },
  });

  const handleStatusChange = (checked) => {
    updateStatusMutation.mutate({ id: companyId, status: checked });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        message="Error"
        description="There was an error loading the company details. Please try again later."
        type="error"
        showIcon
      />
    );
  }

 

  //const getStatusColor = (status) => {
  //  return status ? 'green' : 'red';
  //};

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-6xl mx-auto shadow-lg">
          <Row gutter={[24, 24]} align="middle" className="mb-6">
            <Col xs={24} sm={12} md={18}>
              <div className="flex items-center">
                <Avatar size={64} icon={<BuildingOutlined />} src={company.logo} />
                <div className="ml-4">
                  <Title level={2} className="mb-0">{company.name}</Title>
                  <Text className="text-gray-500">{company.location}</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6} className="text-right">
              <div className="flex items-center justify-end">
                <Switch
                  checked={status}
                  onChange={handleStatusChange}
                  loading={updateStatusMutation.isLoading}
                  className="mr-2"
                />
                <Tag color={status ? 'green' : 'red'} className="text-lg px-4 py-1">
                  {status ? 'Active' : 'Inactive'}
                </Tag>
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={12} sm={8} md={6}>
              <Statistic title="CTC" value={company.ctc} prefix={<DollarOutlined />} />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic title="Open Roles" value={company.openRoles} prefix={<TeamOutlined />} />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic title="Visit Date" value={dayjs(company.visitDate).format('MMM D, YYYY')} prefix={<CalendarOutlined />} />
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Statistic title="Applicants" value={company.applicants?.length || 'N/A'} prefix={<CheckCircleOutlined />} />
            </Col>
          </Row>

          <Divider orientation="left">Company Overview</Divider>
          <Descriptions layout="vertical" column={{ xs: 1, sm: 2, md: 3 }} bordered>
            <Descriptions.Item label="Industry">{company.industry}</Descriptions.Item>
            <Descriptions.Item label="Website">
              <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
            </Descriptions.Item>
            <Descriptions.Item label="Tier">{company.tier}</Descriptions.Item>
            <Descriptions.Item label="Contact Person">{company.contactPerson}</Descriptions.Item>
            <Descriptions.Item label="Email">{company.contactEmail}</Descriptions.Item>
            <Descriptions.Item label="Phone">{company.contactPhone}</Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Job Details</Divider>
          <Card className="mb-6">
            <Title level={4}>{company.jobTitle}</Title>
            <Text>{company.jobDescription}</Text>
            <Row gutter={[16, 16]} className="mt-4">
              <Col span={8}>
                <Statistic title="CTC" value={company.ctc} prefix={<DollarOutlined />} />
              </Col>
              <Col span={8}>
                <Statistic title="Stipend" value={company.stipend} prefix={<DollarOutlined />} />
              </Col>
              <Col span={8}>
                <Statistic title="Internship Duration" value={company.internshipDuration} prefix={<ClockCircleOutlined />} />
              </Col>
            </Row>
          </Card>

          <Collapse defaultActiveKey={['1']} className="mb-6">
            <Panel header="Eligibility & Selection" key="1">
              <Text strong>Eligibility Criteria: </Text>
              <Text>{company.eligibilityCriteria}</Text>
              <br />
              <Text strong>Selection Process: </Text>
              <Text>{company.selectionProcess}</Text>
              <Row gutter={[16, 16]} className="mt-4">
                <Col span={8}>
                  <Statistic title="Interview Date" value={dayjs(company.interviewDate).format('MMM D, YYYY')} prefix={<CalendarOutlined />} />
                </Col>
                <Col span={8}>
                  <Statistic title="PPT Date" value={dayjs(company.pptDate).format('MMM D, YYYY')} prefix={<CalendarOutlined />} />
                </Col>
                <Col span={8}>
                  <Statistic title="Assessment Date" value={dayjs(company.assessmentDate).format('MMM D, YYYY')} prefix={<CalendarOutlined />} />
                </Col>
              </Row>
            </Panel>
          </Collapse>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Allowed Courses" className="h-full">
                <List
                  dataSource={company.allowedCourses}
                  renderItem={course => (
                    <List.Item>
                      <Tag color="blue">{course}</Tag>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Allowed Branches" className="h-full">
                <List
                  dataSource={company.allowedBranches}
                  renderItem={branch => (
                    <List.Item>
                      <Tag color="green">{branch}</Tag>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default CompanyDetails;