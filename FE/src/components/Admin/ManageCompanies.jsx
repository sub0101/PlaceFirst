import React, { useEffect, useState } from "react";
import {
  Typography,
  Select,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  Layout,
} from "antd";
import {
  EditOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  InfoCircleOutlined,
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
  const [editingCompany, setEditingCompany] = useState("");
  const [cardVisible, setCardVisible] = useState(false);
  const [company, setCompany] = useState({});
  const {
    data: companies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompany,
  });
  console.log(companies);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const navigateToEdit = async () => {
    navigate("./edit");
  };

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
    // Update the status in the data source here, possibly via an API call
    console.log(values);
    editingCompany.status = values.status;
    // console.log('Updated values:', { ...editingCompany, ...values });

    setVisible(false);
    form.resetFields();
  };
  const dataSource = Array.from({
    length: 46,
  }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }));
  const columns = [
    { title: "Company", dataIndex: "name", key: "company" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "CTC",
      key: "ctc",
      render: (text, record) => record.companyApplication.ctc,
    },
    { title: "Date", key: "date", render: (text, record) => record.visitDate },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            onClick={navigateToEdit}
            icon={<EditOutlined />}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            icon={<CheckCircleOutlined />}
            onClick={() => handleStatusUpdate(record)}
          >
            Update Status
          </Button>
          <Button
            icon={<InfoCircleOutlined />}
            onClick={() => handleCard(record)}
            style={{ marginLeft: "10px" }}
          >
            View{" "}
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
   {isLoading ? <PageSkeleton /> : 
        <div>

          <Title level={2}>Manage Companies</Title>
          <div className="flex justify-between items-center mb-4">
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={(value) => setFilter(value)}
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
          </div>
       
            <Table
            columns={columns}
            dataSource={companies}
            className="mt-4"
            rowKey="id"
          /> 
          <Modal
            title="Update Status"
            open={visible}
            onOk={handleSave}
            onCancel={() => setVisible(false)}
          >
            <Form
              form={form}
              initialValues={{
                status: editingCompany && editingCompany.status,
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
            title="Company"
            open={cardVisible}
            footer={null}
            onCancel={() => setCardVisible(false)}
          >
            {console.log("com", company)}
            {cardVisible ? <CompanyCard2 company={company} /> : <></>}
          </Modal>
        </div> 
}
    </>
  );
};

export default ManageCompanies;
