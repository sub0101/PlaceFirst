import React, { useState } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Row, Col, theme } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
  LogoutOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { loggedOut } from '../../utils/auth/getUserInfo';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminPage= () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleLogout = () => {  
    loggedOut();
    navigate("/login");
  };

  const menuItems = [
    { key: '/admin/dash', icon: <HomeOutlined />, label: 'Dashboard' },
    { key: '/admin/manage-companies', icon: <UserOutlined />, label: 'Manage Companies' },
    { key: '/admin/view-stats', icon: <FileDoneOutlined />, label: 'View Stats' },
    { key: '/admin/manage-users', icon: <CheckCircleOutlined />, label: 'Manage Users' },
    { key: '/admin/profile', icon: <ProfileOutlined />, label: 'Profile' },
    { key: '/admin/add-company', icon: <PlusOutlined />, label: 'Add New Company' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: token.colorBgContainer,
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
        }}
      >
        <div style={{ 
          height: 64, 
          margin: 16, 
          background: token.colorPrimary, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: token.borderRadiusLG,
        }}>
          <Title level={4} style={{ color: token.colorWhite, margin: 0 }}>
            {collapsed ? 'AP' : 'ADMIN PORTAL'}
          </Title>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={menuItems}
          style={{
            borderRight: 'none',
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
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
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: { fontSize: '18px', color: token.colorPrimary }
              })}
            </Col>
            <Col>
              <Title level={4} style={{ margin: 0 }}>WELCOME TO ADMIN PORTAL</Title>
            </Col>
            <Col>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: token.colorPrimary, marginRight: 8 }} />
              <Button 
                type="primary" 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ 
            padding: 24, 
            background: token.colorBgContainer, 
            borderRadius: token.borderRadiusLG,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;