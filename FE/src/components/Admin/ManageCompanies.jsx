import React, { useState } from "react";
import {
  Typography,
  Select,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Card,
  Row,
  Col,
  Space,
  Tooltip,
  Tag,
} from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getAllCompany } from "../../react query/api/company";
import { useQuery } from "@tanstack/react-query";
import CompanyCard2 from "./company/CompanyCard2";
import CompanyDetails from "../shared/CompanyDetails";
import PageSkeleton from "../shared/PageSkeleton";

const { Title } = Typography;
const { Option } = Select;

const ManageCompanies = () => {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [company, setCompany] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
 
  const {
    data: companies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompany,
  });

  const handleStatusUpdate = (record) => {
    setEditingCompany(record);
    setVisible(true);
  };

  const handleCard = (record) => {
    setCompany(record);
    setCardVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Update the status in the data source here, possibly via an API call
      console.log(values);
      setEditingCompany((prev) => ({ ...prev, status: values.status }));
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const columns = [
    { 
      title: "Company", 
      dataIndex: "name", 
      key: "company",
      render: (text, record) => (
        <Button type="link" onClick={() => handleCard(record)}>
          {text}
        </Button>
      ),
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : status === 'Ongoing' ? 'blue' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: "CTC",
      key: "ctc",
      render: (text, record) => record.companyApplication.ctc,
    },
    { 
      title: "Date", 
      key: "date", 
      render: (text, record) => new Date(record.visitDate).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => navigate(`./edit/${record.id}`, { state: record })}
            />
          </Tooltip>
          <Tooltip title="Update Status">
            <Button
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusUpdate(record)}
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button
              icon={<InfoCircleOutlined />}
              onClick={() => handleCard(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Card className="shadow-md">
      <Row gutter={[16, 16]} align="middle" justify="space-between" className="mb-4">
        <Col xs={24} sm={12}>
          <Title level={2}>Manage Companies</Title>
        </Col>
        <Col xs={24} sm={12} className="text-right">
          <Space wrap>
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={(value) => setFilter(value)}
              placeholder="Filter by status"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="ongoing">Ongoing</Option>
              <Option value="completed">Completed</Option>
            </Select>
            <Link to="/add-company">
              <Button type="primary" icon={<PlusOutlined />}>
                Add New Company
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>

      {isLoading ? (
        <PageSkeleton />
      ) : (
        <Table
          columns={columns}
          dataSource={companies}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{
            responsive: true,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      )}

      <Modal
        title="Update Status"
        open={visible}
        onOk={handleSave}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          initialValues={{
            status: editingCompany?.status,
          }}
        >
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select>
              <Option value="Upcoming">Upcoming</Option>
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Company Details"
        open={cardVisible}
        footer={null}
        onCancel={() => setCardVisible(false)}
        width={720}
      >
        {cardVisible && <CompanyCard2 company={company} />}
      </Modal>
    </Card>
  );
};

export default ManageCompanies;