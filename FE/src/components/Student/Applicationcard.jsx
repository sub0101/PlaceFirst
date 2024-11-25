import React from 'react';
import { Card, Tag, Typography, Tooltip, Avatar, Progress } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const statusColors = {
  'Applied': '#1890ff',
  'Pending': '#faad14',
  'Accepted': '#52c41a',
  'Rejected': '#ff4d4f'
};

const getProgressColor = (status) => {
  return statusColors[status] || '#1890ff';
};

const getProgressPercent = (status) => {
  const percentages = {
    'Applied': 25,
    'Pending': 50,
    'Accepted': 100,
    'Rejected': 100
  };
  return percentages[status] || 0;
};

export default function ApplicationCard({ application, applicant }) {
  return (
    <Card
      hoverable
      className="shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden"
    >
      <div className="relative">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <Avatar
          src={application.company.logo || "/placeholder.svg"}
          size={64}
          className="absolute top-12 left-6 border-4 border-white shadow-lg"
        />
        <div className="p-6 pt-16">
          <Title level={4} className="mb-1 truncate" title={application.jobTitle}>
            {application.jobTitle}
          </Title>
          <Text strong className="block mb-2 truncate" title={application.company.name}>
            {application.company.name}
          </Text>
          <div className="flex items-center justify-between mb-4">
            <Tag color={statusColors[applicant.status]}>
              {applicant.status}
            </Tag>
            <Text type="secondary" className="text-sm">
              Applied {new Date(application.createdAt).toLocaleDateString()}
            </Text>
          </div>
          <Progress
            percent={getProgressPercent(applicant.status)}
            showInfo={false}
            strokeColor={getProgressColor(applicant.status)}
            className="mb-4"
          />
          <div className="space-y-2">
            <Tooltip title="Location">
              <Text className="block truncate">
                <EnvironmentOutlined className="mr-2 text-gray-500" />
                {application.location || 'Not specified'}
              </Text>
            </Tooltip>
            <Tooltip title="Salary Range">
              <Text className="block truncate">
                <DollarOutlined className="mr-2 text-gray-500" />
                {application.ctc || 'Not specified'}
              </Text>
            </Tooltip>
            <Tooltip title="Job Type">
              <Text className="block truncate">
                <ClockCircleOutlined className="mr-2 text-gray-500" />
                {application.jobType || 'Not specified'}
              </Text>
            </Tooltip>
          </div>
        </div>
      </div>
    </Card>
  );
}

