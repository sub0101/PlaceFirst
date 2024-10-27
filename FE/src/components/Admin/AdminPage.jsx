import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Avatar, Row, Col, Drawer, theme } from 'antd';
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

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const SideMenu = () => (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => {
        navigate(key);
        setMobileDrawerVisible(false);
      }}
      items={menuItems}
      style={{
        borderRight: 'none',
      }}
    />
  );

  const siderWidth = 200;

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        className="hidden lg:block fixed left-0 top-0 bottom-0 z-10"
        style={{
          overflow: 'auto',
          height: '100vh',
          backgroundColor: token.colorBgContainer,
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
          width: collapsed ? 80 : siderWidth,
          minWidth: collapsed ? 80 : siderWidth,
          maxWidth: collapsed ? 80 : siderWidth,
        }}
      >
        <div className="h-16 m-4 bg-primary flex items-center justify-center rounded-lg">
          <Title level={4} className="text-white m-0">
            {collapsed ? 'AP' : 'ADMIN PORTAL'}
          </Title>
        </div>
        <SideMenu />
      </Sider>
      <Layout className={`transition-all duration-300 ease-in-out ${windowWidth >= 992 ? (collapsed ? 'lg:ml-[80px]' : 'lg:ml-[200px]') : ''}`}>
        <Header className="p-0 bg-white shadow-md sticky top-0 z-20 w-full">
          <Row justify="space-between" align="middle" className="h-full px-4">
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex text-lg text-primary"
              />
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setMobileDrawerVisible(true)}
                className="lg:hidden text-lg text-primary"
              />
            </Col>
            <Col className="hidden sm:block">
              <Title level={4} className="m-0">WELCOME TO ADMIN PORTAL</Title>
            </Col>
            <Col>
              <Avatar icon={<UserOutlined />} className="bg-primary mr-2" />
              <Button 
                type="primary" 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
                className="hidden sm:inline-flex"
              >
                Logout
              </Button>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="sm:hidden text-primary"
              />
            </Col>
          </Row>
        </Header>
        <Content className="m-4">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Drawer
        title="Admin Menu"
        placement="left"
        onClose={() => setMobileDrawerVisible(false)}
        open={mobileDrawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <SideMenu />
      </Drawer>
    </Layout>
  );
};

export default AdminPage;