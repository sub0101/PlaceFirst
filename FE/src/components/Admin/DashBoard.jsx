import React from 'react';
import { Layout, Typography, Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const DashBoard = () => {
  return (
    <>
      <Title level={2}>Admin Dashboard</Title>
      <Card className="mb-4">
        <Title level={3}>Notifications</Title>
        <Paragraph>Pending approvals for new companies.</Paragraph>
        <Paragraph>Update required for placement statistics.</Paragraph>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="mb-4" hoverable>
          <Title level={4}>Manage Companies</Title>
          <Button type="primary" block icon={<PlusOutlined />}>Add New Company</Button>
        </Card>
        <Card className="mb-4" hoverable>
          <Title level={4}>View Placement Stats</Title>
          <Button type="primary" block>View Stats</Button>
        </Card>
        <Card className="mb-4" hoverable>
          <Title level={4}>Manage Users</Title>
          <Button type="primary" block>Manage Users</Button>
        </Card>
      </div>
    </>
  );
};

export default DashBoard;
