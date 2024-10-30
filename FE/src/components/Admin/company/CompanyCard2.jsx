import React from 'react';
import { Card, Button, Typography, Tag, Space, Row, Col, Tooltip, Statistic } from 'antd';
import { DollarCircleOutlined, CalendarOutlined, TeamOutlined, BuildOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../utils/auth/getUserInfo';

const { Text, Title } = Typography;

export default function CompanyCard2({ company }) {
  const { companyApplication, name: title, industry: type, date} = company;
  const { applicants, id: companyId, ctc } = companyApplication;
  const navigate = useNavigate();
  const { id } = getUserInfo();
  const status =  companyApplication.status;
  const statusColor = status ? 'blue' : 'orange';

  const statusText = !(companyApplication.status )? 'Closed' : 'Open';
console.log(companyApplication.status)
  return (
    <Card
      hoverable
      className="shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
      // bodyStyle={{ padding: '24px' }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={24}>
          <Space className="w-full justify-between">
            <Title level={3} className="m-0">{title}</Title>
            <Tag color={statusColor} className="text-sm px-4 py-1 rounded-full">
              {statusText}
            </Tag>
          </Space>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Statistic
                title={<Text strong><BuildOutlined className="mr-2" />Industry</Text>}
                value={type}
                className="mb-4"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={<Text strong><DollarCircleOutlined className="mr-2" />CTC</Text>}
                value={ctc}
                prefix="₹"
                className="mb-4"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={<Text strong><CalendarOutlined className="mr-2" />Date</Text>}
                value={date}
                className="mb-4"
              />
            </Col>
            <Col span={12}>
              <Statistic
                title={<Text strong><TeamOutlined className="mr-2" />Applicants</Text>}
                value={applicants.length}
                className="mb-4"
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Space direction="vertical" size="middle" className="w-full">
            <Button 
              type="primary" 
              icon={<EyeOutlined />} 
              onClick={() => navigate(`../details/${companyId}`)}
              className="w-full h-10 text-base font-semibold"
            >
              View Details
            </Button>
            <Button 
              onClick={() => navigate(`../applicants/${companyId}` , {state:{companyApplication}})}
              icon={<UserOutlined />}
              className="w-full h-10 text-base font-semibold border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              View Applicants
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}