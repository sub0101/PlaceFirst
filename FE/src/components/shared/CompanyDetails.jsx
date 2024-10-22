import React, { useState } from 'react';
import { Card, Row, Col, Typography, Avatar, Tooltip, Button, Tag, Statistic, Collapse, Layout, Divider } from 'antd';
import { motion } from 'framer-motion';
import { EditOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, TeamOutlined, CalendarOutlined, DollarOutlined, ClockCircleOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Header, Content } = Layout;
const { Panel } = Collapse;

const company = {
  name: "Tech Corp",
  logo: "https://via.placeholder.com/100",
  location: "San Francisco, CA",
  industry: "Technology",
  website: "https://www.techcorp.com",
  contactPerson: "John Doe",
  contactEmail: "john.doe@techcorp.com",
  contactPhone: "+1 (555) 123-4567",
  visitDate: "2022-05-15",
  status: "Active",
  addedAt: "2022-01-01",
  eligibilityCriteria: "Minimum 3.0 GPA",
  studentsSelected: 10,
  jobTitle: "Software Engineer",
  jobDescription: "Develop and maintain web applications using modern technologies such as React, Node.js, and AWS. Collaborate with cross-functional teams to deliver high-quality software solutions.",
  ctc: "100,000 USD",
  stipend: "2000 USD",
  recruitmentMode: "Online",
  internshipDuration: "6 months",
  bondPeriod: "1 year",
  openRoles: 5,
  selectionProcess: "Written Test, Technical Interview, HR Interview",
  interviewDate: "2022-06-01",
  pptDate: "2022-04-01",
  assessmentDate: "2022-05-01",
  tier: "Tier 1",
  allowedCourses: ["B.Tech", "M.Tech"],
  allowedBranches: ["CSE", "ECE", "IT", "EEE"],
};

export default function CompanyDetails() {
  const [totalApplicants, setTotalApplicants] = useState(150); // Simulated total applicants

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const renderInfoCard = (title, value, icon) => (
    <Card className="h-full">
      <Statistic
        title={<span className="text-lg font-semibold">{title}</span>}
        value={value}
        prefix={icon}
        valueStyle={{ color: '#3f8600' }}
      />
    </Card>
  );

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between h-full">
          <div className="flex items-center">
            <Avatar size={64} src={company.logo} className="mr-4" />
            <div>
              <Title level={2} className="mb-0">{company.name}</Title>
              <Text className="text-gray-600">{company.location}</Text>
            </div>
          </div>
          <Tag color="green" className="text-lg px-4 py-1">{company.status}</Tag>
        </div>
      </Header>
      <Content className="container mx-auto py-8 px-4">
        <motion.div {...fadeInUp}>
          <Row gutter={[16, 16]} className="mb-8">
            {renderInfoCard("Total Applicants", totalApplicants, <TeamOutlined />)}
            {renderInfoCard("Open Roles", company.openRoles, <BookOutlined />)}
            {renderInfoCard("CTC", company.ctc, <DollarOutlined />)}
            {renderInfoCard("Visit Date", company.visitDate, <CalendarOutlined />)}
          </Row>
        </motion.div>

        <Collapse defaultActiveKey={['1']} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Panel header="Company Overview" key="1">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Tooltip title="Industry">
                  <Button type="link" icon={<GlobalOutlined />} className="w-full text-left">{company.industry}</Button>
                </Tooltip>
              </Col>
              <Col xs={24} md={8}>
                <Tooltip title="Website">
                  <Button type="link" icon={<GlobalOutlined />} className="w-full text-left" onClick={() => window.open(company.website, '_blank')}>{company.website}</Button>
                </Tooltip>
              </Col>
              <Col xs={24} md={8}>
                <Tooltip title="Tier">
                  <Button type="link" icon={<BookOutlined />} className="w-full text-left">{company.tier}</Button>
                </Tooltip>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Tooltip title="Contact Person">
                  <Button type="link" icon={<EditOutlined />} className="w-full text-left">{company.contactPerson}</Button>
                </Tooltip>
              </Col>
              <Col xs={24} md={8}>
                <Tooltip title="Email">
                  <Button type="link" icon={<MailOutlined />} className="w-full text-left">{company.contactEmail}</Button>
                </Tooltip>
              </Col>
              <Col xs={24} md={8}>
                <Tooltip title="Phone">
                  <Button type="link" icon={<PhoneOutlined />} className="w-full text-left">{company.contactPhone}</Button>
                </Tooltip>
              </Col>
            </Row>
          </Panel>

          <Panel header="Job Details" key="2">
            <Title level={4}>{company.jobTitle}</Title>
            <Paragraph>{company.jobDescription}</Paragraph>
            <Row gutter={[16, 16]} className="mt-4">
              <Col xs={24} sm={12} md={8}>
                <Statistic title="CTC" value={company.ctc} prefix={<DollarOutlined />} />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Statistic title="Stipend" value={company.stipend} prefix={<DollarOutlined />} />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Statistic title="Internship Duration" value={company.internshipDuration} prefix={<ClockCircleOutlined />} />
              </Col>
            </Row>
          </Panel>

          <Panel header="Eligibility & Selection" key="3">
            <Paragraph><strong>Eligibility Criteria:</strong> {company.eligibilityCriteria}</Paragraph>
            <Paragraph><strong>Selection Process:</strong> {company.selectionProcess}</Paragraph>
            <Row gutter={[16, 16]} className="mt-4">
              <Col xs={24} sm={12} md={8}>
                <Statistic title="Interview Date" value={company.interviewDate} prefix={<CalendarOutlined />} />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Statistic title="PPT Date" value={company.pptDate} prefix={<CalendarOutlined />} />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Statistic title="Assessment Date" value={company.assessmentDate} prefix={<CalendarOutlined />} />
              </Col>
            </Row>
            <Divider />
            <Title level={5}>Allowed Courses</Title>
            <div className="flex flex-wrap gap-2 mb-4">
              {company.allowedCourses.map(course => (
                <Tag key={course} color="blue">{course}</Tag>
              ))}
            </div>
            <Title level={5}>Allowed Branches</Title>
            <div className="flex flex-wrap gap-2">
              {company.allowedBranches.map(branch => (
                <motion.div whileHover={{ scale: 1.1 }} key={branch}>
                  <Tag color="green">{branch}</Tag>
                </motion.div>
              ))}
            </div>
          </Panel>
        </Collapse>
      </Content>
    </Layout>
  );
}