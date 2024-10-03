import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
  LogoutOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
import DashBoard from './DashBoard';
import ManageCompanies from './ManageCompanies';
import ViewStats from './ViewStats';
import Profile from './Profile';
import ManageUsers from './ManageUsers';
import AddCompanyPage from './AddCompanyPage';
import { loggedOut } from '../../utils/auth/getUserInfo';

const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    loggedOut();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <div className="logo" style={{ color: 'white', padding: '16px', textAlign: 'center', fontSize: '24px' }}>
          ADMIN PORTAL
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/manage-companies" icon={<UserOutlined />}>
            Manage Companies
          </Menu.Item>
          <Menu.Item key="/view-stats" icon={<FileDoneOutlined />}>
            View Stats
          </Menu.Item>
          <Menu.Item key="/manage-users" icon={<CheckCircleOutlined />}>
            Manage Users
          </Menu.Item>
          <Menu.Item key="/profile" icon={<ProfileOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="/add-company" icon={<PlusOutlined />}>
            Add New Company
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: '0 16px', background: '#001529', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '24px' }}>WELCOME TO ADMIN PORTAL</div>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/manage-companies" element={<ManageCompanies />} />
              <Route path="/view-stats" element={<ViewStats />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-company" element={<AddCompanyPage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
