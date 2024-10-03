import React, { useState } from 'react';
import { Layout, Menu, Card, Button, Typography, Select } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const S_DashBoard= () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [filter, setFilter] = useState('all');
  const [username] = useState('John Doe'); // Simulate logged-in user

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return (
          <>
            <Title level={2}>Welcome back, {username}!</Title>
            <Card className="mb-4">
              <Title level={3}>Announcements</Title>
              <Paragraph>Don't forget to apply for upcoming placements!</Paragraph>
              <Paragraph>Workshop on interview skills next week. Sign up now!</Paragraph>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="mb-4" hoverable>
                <Title level={4}>My Applications</Title>
                <Button type="primary" block>View Applications</Button>
              </Card>
              <Card className="mb-4" hoverable>
                <Title level={4}>Upcoming Interviews</Title>
                <Button type="primary" block>Check Schedule</Button>
              </Card>
              <Card className="mb-4" hoverable>
                <Title level={4}>Resume Tips</Title>
                <Button type="primary" block>Learn More</Button>
              </Card>
            </div>
          </>
        );
      case '2':
        return (
          <>
            <Title level={2}>Companies</Title>
            <Select defaultValue="all" style={{ width: 200 }} onChange={(value) => setFilter(value)}>
              <Option value="all">All</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="ongoing">Ongoing</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {(filter === 'all' || filter === 'upcoming') && (
                <>
                  <Card title="INFOSYS" extra={<Button type="primary">UPCOMING</Button>} className="mb-4">
                    <p>Type: SERVICE based</p>
                    <p>CTC: 70000</p>
                    <p>Date: 02 Feb 2022</p>
                    <p>3 students have Applied</p>
                  </Card>
                  <Card title="AMAZON" extra={<Button type="primary">UPCOMING</Button>}>
                    <p>Type: PRODUCT based</p>
                    <p>CTC: 100000000</p>
                    <p>Date: 18 Jun 2023</p>
                    <p>1 student has Applied</p>
                  </Card>
                </>
              )}
              {(filter === 'all' || filter === 'ongoing') && (
                <>
                  <Card title="Google" extra={<Button type="primary">Applied</Button>} className="mb-4">
                    <p>Type: PRODUCT</p>
                    <p>CTC: 100000</p>
                  </Card>
                  <Card title="Microsoft" extra={<Button type="primary">Applied</Button>} className="mb-4">
                    <p>Type: PRODUCT</p>
                    <p>CTC: 100000</p>
                  </Card>
                </>
              )}
              {(filter === 'all' || filter === 'completed') && (
                <>
                  <Card title="Google" extra={<Button type="primary">Placed</Button>} className="mb-4">
                    <p>Type: PRODUCT</p>
                    <p>CTC: 100000</p>
                  </Card>
                  <Card title="Microsoft" extra={<Button type="primary">Placed</Button>} className="mb-4">
                    <p>Type: PRODUCT</p>
                    <p>CTC: 100000</p>
                  </Card>
                </>
              )}
            </div>
          </>
        );
      case '3':
        return <div>Students Page Content</div>;
      case '4':
        return <div>Applied Page Content</div>;
      case '5':
        return <div>Placed Page Content</div>;
      case '6':
        return <div>Profile Page Content</div>;
      case '7':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">My Applications</h2>
            <Card title="Google" extra={<Button type="primary">View Details</Button>} className="mb-4">
              <p>Status: Applied</p>
              <p>Interview Date: 25th Oct 2024</p>
            </Card>
            <Card title="Microsoft" extra={<Button type="primary">View Details</Button>} className="mb-4">
              <p>Status: Interview Scheduled</p>
              <p>Interview Date: 30th Oct 2024</p>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <div className="logo" style={{ color: 'white', padding: '16px', textAlign: 'center', fontSize: '24px' }}>
          PLACEMENT PORTAL
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Company
          </Menu.Item>
          <Menu.Item key="3" icon={<FileDoneOutlined />}>
            Students
          </Menu.Item>
          <Menu.Item key="4" icon={<CheckCircleOutlined />}>
            Applied
          </Menu.Item>
          <Menu.Item key="5" icon={<CheckCircleOutlined />}>
            Placed
          </Menu.Item>
          <Menu.Item key="6" icon={<ProfileOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="7" icon={<FileDoneOutlined />}>
            Application Tracker
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0, background: '#001529', color: 'white', textAlign: 'center', fontSize: '24px' }}>
          WELCOME TO PLACEMENT PORTAL
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default S_DashBoard;
