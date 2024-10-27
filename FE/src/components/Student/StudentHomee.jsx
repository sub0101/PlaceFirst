import React from 'react';
import { Layout, Card, Button, Typography, Select, Row, Col } from 'antd';

import { useState } from 'react';
const { Title, Paragraph } = Typography;

function StudentHomee() {
  const [username] = useState('John Doe'); 
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
  )
}

export default StudentHomee

