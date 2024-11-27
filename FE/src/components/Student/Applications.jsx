import React, { useState, useMemo } from 'react';
import { Typography, Input, Select, Row, Col, Statistic, Card, Empty } from 'antd';
import { motion } from 'framer-motion';
import ApplicationCard from './Applicationcard';
import { useQuery } from '@tanstack/react-query';
import { getAppliedCompany } from '../../react query/api/company';
import PageSkeleton from '../shared/PageSkeleton';
import { FileSearchOutlined, BuildOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');

  const { data: applications = [], isError, isLoading } = useQuery({
    queryFn: getAppliedCompany,
    queryKey: ["getCompanies"],
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const filteredApplications = useMemo(() => {
    return applications.filter(app => 
      (statusFilter === 'All' || app.applicant.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (companyFilter === 'All' || app.company.name === companyFilter) &&
      (app.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [applications, searchTerm, statusFilter, companyFilter]);

  const statuses = useMemo(() => ['All', 'Applied', 'Pending', 'Accepted', 'Rejected'], []);
  const companies = useMemo(() => ['All', ...new Set(applications.map(app => app.company.name))], [applications]);

  const statusCounts = useMemo(() => {
    return filteredApplications.reduce((acc, app) => {
      acc[app.applicant.status] = (acc[app.applicant.status] || 0) + 1;
      console.log(acc)
      return acc;
    }, { applied: 0, Pending: 0, Accepted: 0, Rejected: 0 });
  }, [filteredApplications]);

  if (isLoading) return <PageSkeleton />;
  if (isError) return <div>Error loading applications</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Title level={2} className="text-center mb-8 text-indigo-700">
            Your Job Applications Dashboard
          </Title>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-md">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Search
                  placeholder="Search applications"
                  allowClear
                  enterButton="Search"
                  size="large"
                  className="w-full"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col xs={24} md={8}>
                <Select
                  className="w-full"
                  size="large"
                  placeholder="Filter by status"
                  onChange={setStatusFilter}
                  defaultValue="All"
                >
                  {statuses.map(status => (
                    <Option key={status} value={status}>{status}</Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} md={8}>
                <Select
                  className="w-full"
                  size="large"
                  placeholder="Filter by company"
                  onChange={setCompanyFilter}
                  defaultValue="All"
                >
                  {companies.map(company => (
                    <Option key={company} value={company}>{company}</Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="shadow-md">
            <Row gutter={16}>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Applied"
                  value={statusCounts.applied}
                  prefix={<FileSearchOutlined style={{ color: '#1890ff' }} />}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Pending"
                  value={statusCounts.pending}
                  prefix={<BuildOutlined style={{ color: '#faad14' }} />}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Accepted"
                  value={statusCounts.accepted}
                  prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Rejected"
                  value={statusCounts.rejected}
                  prefix={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
                />
              </Col>
            </Row>
          </Card>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredApplications.length > 0 ? (
            filteredApplications.map(application => (
              <motion.div key={application.id} variants={itemVariants}>
                <ApplicationCard application={application} applicant={application.applicant} />
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants} className="col-span-full">
              <Empty
                description="No applications found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
