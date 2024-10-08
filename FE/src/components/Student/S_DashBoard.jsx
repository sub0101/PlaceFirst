import React, { useState } from 'react';
import { Layout, Menu, Card, Button, Typography, Select, Row, Col, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loggedOut } from '../../utils/auth/getUserInfo';
import {
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const S_DashBoard = () => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [filter, setFilter] = useState('all');
  const [username] = useState('John Doe'); // Simulate logged-in user
  const navigate = useNavigate();

  const handleLogout = () => {  
    loggedOut();
    navigate("/login");
  };

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
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12} lg={8}>
                <Card hoverable>
                  <Title level={4}>My Applications</Title>
                  <Button type="primary" block>View Applications</Button>
                </Card>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Card hoverable>
                  <Title level={4}>Upcoming Interviews</Title>
                  <Button type="primary" block>Check Schedule</Button>
                </Card>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Card hoverable>
                  <Title level={4}>Resume Tips</Title>
                  <Button type="primary" block>Learn More</Button>
                </Card>
              </Col>
            </Row>
          </>
        );
      case '2':
        return (
          <>
            <Title level={2}>Companies</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Select defaultValue="all" style={{ width: 200 }} onChange={(value) => setFilter(value)}>
                <Option value="all">All</Option>
                <Option value="upcoming">Upcoming</Option>
                <Option value="ongoing">Ongoing</Option>
                <Option value="completed">Completed</Option>
              </Select>
              <Row gutter={[16, 16]}>
                {(filter === 'all' || filter === 'upcoming') && (
                  <>
                    <Col xs={24} md={12} lg={8}>
                      <Card title="INFOSYS" extra={<Button type="primary">UPCOMING</Button>}>
                        <p>Type: SERVICE based</p>
                        <p>CTC: 70000</p>
                        <p>Date: 02 Feb 2022</p>
                        <p>3 students have Applied</p>
                      </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                      <Card title="AMAZON" extra={<Button type="primary">UPCOMING</Button>}>
                        <p>Type: PRODUCT based</p>
                        <p>CTC: 100000000</p>
                        <p>Date: 18 Jun 2023</p>
                        <p>1 student has Applied</p>
                      </Card>
                    </Col>
                  </>
                )}
                {(filter === 'all' || filter === 'ongoing') && (
                  <>
                    <Col xs={24} md={12} lg={8}>
                      <Card title="Google" extra={<Button type="primary">Applied</Button>}>
                        <p>Type: PRODUCT</p>
                        <p>CTC: 100000</p>
                      </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                      <Card title="Microsoft" extra={<Button type="primary">Applied</Button>}>
                        <p>Type: PRODUCT</p>
                        <p>CTC: 100000</p>
                      </Card>
                    </Col>
                  </>
                )}
                {(filter === 'all' || filter === 'completed') && (
                  <>
                    <Col xs={24} md={12} lg={8}>
                      <Card title="Google" extra={<Button type="primary">Placed</Button>}>
                        <p>Type: PRODUCT</p>
                        <p>CTC: 100000</p>
                      </Card>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                      <Card title="Microsoft" extra={<Button type="primary">Placed</Button>}>
                        <p>Type: PRODUCT</p>
                        <p>CTC: 100000</p>
                      </Card>
                    </Col>
                  </>
                )}
              </Row>
            </Space>
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
            <Title level={2}>My Applications</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card title="Google" extra={<Button type="primary">View Details</Button>}>
                  <p>Status: Applied</p>
                  <p>Interview Date: 25th Oct 2024</p>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card title="Microsoft" extra={<Button type="primary">View Details</Button>}>
                  <p>Status: Interview Scheduled</p>
                  <p>Interview Date: 30th Oct 2024</p>
                </Card>
              </Col>
            </Row>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="site-layout-background">
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
        <Header
          className="site-layout-background"
          style={{
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#001529',
            color: 'white',
          }}
        >
          <Title level={3} style={{ color: 'white', margin: 0 }}>WELCOME TO PLACEMENT PORTAL</Title>
          <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default S_DashBoard;
