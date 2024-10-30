import React, { useEffect, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { updateCompany } from "../../react query/api/company";
const { Title } = Typography;
const { Option } = Select;

const ManageCompanies = () => {
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [status , setStatus] = useState(editingCompany?.companyApplication.status)
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
  const { mutate:companyMutation, isPending , isError} = useMutation({
    mutationFn:updateCompany,
    mutationKey:"updateCompany",
    onSuccess:(data)=>{
      message.success("Sucessfully Updated data")
    }
  })

  const handleStatusUpdate = (record) => {
    setEditingCompany(record);
  

  
    setVisible(true);
  };

  const handleCard = (record) => {
    setCompany(record);
  
    setCardVisible(true);
  };


  const handleSave = async () => {

      const values = await form.validateFields();
      
      console.log(values);
      const current = editingCompany;
      editingCompany.companyApplication.status = values.status 
      
     companyMutation({company:{id:editingCompany.id} ,companyApplication:{status :editingCompany.companyApplication.status} })
    

  console.log(editingCompany)

      setVisible(false);
      form.resetFields();
    }

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
      render: (text, record) => {
        const status = record.companyApplication.status;
        const value = status ? "Ongoing" : "Completed";
      
      
        return (
          <Tag color={status === true ? "green" : status === false ? "blue" : "orange"}>
            {value}
          </Tag>
        );
      }
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
      
              <Option  value={true} key={'ongoing'} >Ongoing</Option>
              <Option value={false} key={'completed'} >Completed</Option>
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
          // initialValues={{
          // }}
        >
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
            initialValue={status }
            
          >
            <Select>
            <Option  value={true} key={'ongoing'} >Ongoing</Option>
            <Option value={false} key={'completed'} >Completed</Option>
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