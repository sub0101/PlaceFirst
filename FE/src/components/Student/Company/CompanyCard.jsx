import React from 'react';
import { Card, Button, Typography, Tag, Space, Row, Col, Tooltip } from 'antd';
import { DollarCircleOutlined, CalendarOutlined, TeamOutlined, BuildOutlined, FileAddOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../utils/auth/getUserInfo';

const { Text, Title } = Typography;

const CompanyCard = ({ title, status, type, ctc, date, applicants,companyId }) => {
 
 
  const navigate = useNavigate();
  const {id} = getUserInfo()
  const hasApplied = applicants && applicants.some((val) => val.studentId === id);
  const statusColor = hasApplied ? 'blue' : 'red';
  const statusText = hasApplied ? 'Applied' : 'Not Applied';

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      className="shadow-md rounded-lg"
      bodyStyle={{ padding: '16px' }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={4}>{title}</Title>
        </Col>
        <Col>
          <Tag color={statusColor}>{statusText}</Tag>
        </Col>
      </Row>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Text><BuildOutlined /> Type: {type}</Text>
        <Text><DollarCircleOutlined /> CTC: ₹{ctc}</Text>
        {date && <Text><CalendarOutlined /> Date: {date}</Text>}
        {/* {applicants && (
          <Text><TeamOutlined /> {applicants} student{applicants !== 1 ? 's have' : ' has'} Applied</Text>
        )} */}
      </Space>
      <Space direction="vertical" size="small" style={{ width: '100%', marginTop: '16px' }}>
        <Button type="primary" icon={<ArrowRightOutlined />} onClick={() => navigate(`./details/${companyId}`)} block>
          {status === 'ongoing' ? 'View Application' : 'View Details'}
        </Button>
        {status && (
          <Tooltip title="Apply Now">
            <Button  disabled={hasApplied}  onClick={()=> navigate(`/application/${companyId}`)} type="default" icon={<FileAddOutlined />} block>
              Apply
            </Button>
          </Tooltip>
        )}
      </Space>
    </Card>
  );
};

export default CompanyCard;
