import React, { useState } from 'react';
import { Layout, Menu, Card, Button, Typography, Avatar, Row, Col, Drawer, theme } from 'antd';
import logo from "../../assets/logo.svg"
import {
  HomeOutlined,
  BuildOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// Assume these components exist in your project
import StudentHome from './StudentHome';
import Company from './Company/Company';
import StudentProfile from './StudentProfile';
import { loggedOut } from '../../utils/auth/getUserInfo';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const StudentPage=() => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleLogout = () => {
    // Implement your logout logic here
    loggedOut()
    navigate("/login");
  };

  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Home' },
    { key: '2', icon: <BuildOutlined />, label: 'Company' },
    { key: '3', icon: <TeamOutlined />, label: 'Students' },
    { key: '4', icon: <CheckCircleOutlined />, label: 'Applied' },
    { key: '5', icon: <CheckCircleOutlined />, label: 'Placed' },
    { key: '6', icon: <UserOutlined />, label: 'Profile' },
    { key: '7', icon: <FileTextOutlined />, label: 'Application Tracker' },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <StudentHome />;
      case '2':
        return <Company />;
      case '6':
        return <StudentProfile />;
      case '7':
        return (
          <div>
            <Title level={2}>My Applications</Title>
            <Row gutter={[16, 16]}>
              {['Google', 'Microsoft'].map((company, index) => (
                <Col xs={24} sm={12} key={company}>
                  <Card
                    title={company}
                    extra={<Button type="primary">View Details</Button>}
                    hoverable
                    style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                  >
                    <p>Status: {index === 0 ? 'Applied' : 'Interview Scheduled'}</p>
                    <p>Interview Date: {index === 0 ? '25th Oct 2024' : '30th Oct 2024'}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      default:
        return <div>Content for {menuItems.find(item => item.key === selectedKey)?.label}</div>;
    }
  };

  const SideMenu = () => (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={['1']}
      selectedKeys={[selectedKey]}
      onClick={({ key }) => {
        setSelectedKey(key);
        setDrawerVisible(false);
      }}
      items={menuItems}
      style={{
        background: token.colorBgContainer,
      }}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          background: token.colorBgContainer,
        }}
      >
        <div className="logo" style={{ 
          height: 64, 
          margin: 16, 
          // background: token.colorPrimary, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {/* <Title level={4} style={{ color: token.colorWhite, margin: 0 }}>PLACEMENT PORTAL</Title> */}
          <Avatar size={80} src={logo} />
        </div>
        <SideMenu />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: 0, 
          background: token.colorBgContainer, 
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}>
          <Row justify="space-between" align="middle" style={{ height: '100%', padding: '0 16px' }}>
            <Col>
              {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: { fontSize: '18px', color: token.colorPrimary }
              })}
            </Col>
            <Col>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimary, marginRight: 8 }} />
              <Button type="link" icon={<LogoutOutlined />} onClick={handleLogout} style={{ color: token.colorPrimary }}>
                Logout
              </Button>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: token.colorBgContainer, borderRadius: token.borderRadiusLG }}>
          {renderContent()}
        </Content>
      </Layout>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <SideMenu />
      </Drawer>
    </Layout>
  );
};

export default StudentPage;