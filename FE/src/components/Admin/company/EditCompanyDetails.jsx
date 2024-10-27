import React, { useState } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  message,
  DatePicker,
  InputNumber,
  Divider,
  Tooltip,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SaveOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getAllDepartments } from "../../../react query/api/departments";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

// Custom hook for form handling
const useFormSubmit = (initialValues) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (values) => {
    setLoading(true);
   
    
    setTimeout(() => {
      message.success("Company details updated successfully!");
      setLoading(false);
      navigate("/dashboard"); // Redirect after saving
    }, 1500);
  };

  return { form, loading, handleFinish };
};

export default function EditCompanyDetails() {
  const {data:departments , isLoading }  = useQuery({
    queryFn:getAllDepartments,
    queryKey:['departments']
  })
  const company = useLocation().state || {}
  const {companyApplication} = company && company
  const { form, loading, handleFinish } = useFormSubmit({
    // Add initial values here if needed
  });
  console.log(companyApplication)

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <Title level={2} className="text-center mb-6">
              Edit Company Details
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="companyName"
                  label="Company Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the company name",
                    },
                  
                  ]}
                >
                  <Input defaultValue={company.name} placeholder="Enter company name" />
                </Form.Item>

                <Form.Item
                  name="industry"
                  label="Industry"
                  rules={[
                    { required: true, message: "Please enter the industry" },
                  ]}
                >
                  <Input defaultValue={company.type} placeholder="Enter industry (e.g., Technology, Finance)" />
                </Form.Item>

                <Form.Item
                  name="website"
                  label="Website"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the company website",
                    },
                  ]}
                >
                  <Input defaultValue={company?.website} placeholder="Enter company website" />
                </Form.Item>

                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    { required: true, message: "Please enter the location" },
                  ]}
                >
                  <Input defaultValue={company.location} placeholder="Enter company location" />
                </Form.Item>
              </div>

              <Divider orientation="left">Contact Information</Divider>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Form.Item
                  name="contactPerson"
                  label="Contact Person"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact person",
                    },
                  ]}
                >
                  <Input defaultValue={company.contactPerson} placeholder="Enter contact person name" />
                </Form.Item>

                <Form.Item
                  name="contactEmail"
                  label="Contact Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact email",
                    },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input defaultValue={company.contactEmail} placeholder="Enter contact email" />
                </Form.Item>

                <Form.Item
                  name="contactPhone"
                  label="Contact Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact phone",
                    },
                  ]}
                >
                  <Input defaultValue={company.contactPhone} placeholder="Enter contact phone" />
                </Form.Item>
              </div>

              <Divider orientation="left">Job Details</Divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="jobTitle"
                  label="Job Title"
                  rules={[
                    { required: true, message: "Please enter the job title" },
                  ]}
                >
                  <Input defaultValue={companyApplication.jobTitle} placeholder="Enter job title (e.g., Software Engineer)" />
                </Form.Item>

                <Form.Item
                  name="openRoles"
                  label="Open Roles"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the number of open roles",
                    },
                  ]}
                >
                  <InputNumber defaultValue={companyApplication.openRoles}
                    min={1}
                    placeholder="Enter number of open roles"
                    className="w-full"
                  />
                </Form.Item>

                <Form.Item
                  name="ctc"
                  label="CTC"
                  rules={[
                    { required: true, message: "Please enter the CTC offered" },
                  ]}
                >
                  <Input defaultValue={companyApplication.ctc} placeholder="Enter CTC (e.g., ₹10,00,000)" />
                </Form.Item>

                <Form.Item
                  name="stipend"
                  label="Stipend"
                  
                  rules={[
                    {
                      required: true,
                      message: "Please enter the stipend amount",
                    },
                  ]}
                >
                  <Input defaultValue={companyApplication.stipend} placeholder="Enter stipend amount (e.g., ₹20,000/month)" />
                </Form.Item>

                <Form.Item
                  name="internshipDuration"
                  label="Internship Duration"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the internship duration",
                    },
                  ]}
                >
                  <Input defaultValue={companyApplication.internshipDuration} placeholder="Enter internship duration (e.g., 6 months)" />
                </Form.Item>

                <Form.Item
                  name="bondPeriod"
                  label="Bond Period"
                  rules={[
                    { required: true, message: "Please enter the bond period" },
                  ]}
                >
                  <Input defaultValue={companyApplication.bondPeriod} placeholder="Enter bond period (e.g., 1 year)" />
                </Form.Item>
              </div>

              <Form.Item
                name="jobDescription"
                label="Job Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter the job description",
                  },
                ]}
              >
                <TextArea defaultValue={companyApplication.jonDescription}
                  rows={4}
                  placeholder="Enter detailed job description"
                />
              </Form.Item>

              <Divider orientation="left">Recruitment Details</Divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="recruitmentMode"
                  label="Recruitment Mode"
                  rules={[
                    {
                      required: true,
                      message: "Please specify the recruitment mode",
                    },
                  ]}
                > 
                  <Select defaultValue={companyApplication.recruitmentMode} placeholder="Select recruitment mode">
                    <Option value="Online">Online</Option>
                    <Option value="Offline">Offline</Option>
                    <Option value="Hybrid">Hybrid</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="applicationDeadline"
                  label="Application Deadline"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the application deadline",
                    },
                  ]}
                >
                  <DatePicker  className="w-full" />
                </Form.Item>

                <Form.Item
                  name="interviewDate"
                  label="Interview Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the interview date",
                    },
                  ]}
                >
                  <DatePicker defaultValue= {dayjs(companyApplication.interviewDate) }className="w-full" />
                </Form.Item>

                <Form.Item
                  name="pptDate"
                  label={
                    <span>
                      PPT Date
                      <Tooltip title="Pre-Placement Talk Date">
                        <QuestionCircleOutlined className="ml-1" />
                      </Tooltip>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter the PPT date" },
                  ]}
                >
                  <DatePicker defaultValue={dayjs(companyApplication.pptDate) } className="w-full" />
                </Form.Item>
              </div>  

              <Form.Item
                name="selectionProcess"
                label="Selection Process"
                rules={[
                  {
                    required: true,
                    message: "Please enter the selection process",
                  },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Describe the selection process (e.g., Written Test, Technical Interview, HR Interview)"
                />
              </Form.Item>

              <Divider orientation="left">Eligibility</Divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  name="eligibilityCriteria"
                  label="Eligibility Criteria"
                  rules={[
                    {
                      required: true,
                      message: "Please enter eligibility criteria",
                    },
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Enter eligibility criteria (e.g., Minimum 3.0 GPA, No active backlogs)"
                  />
                </Form.Item>

                <div>
                  <Form.Item
                    name="allowedCourses"
                    label="Allowed Courses"
                    rules={[
                      {
                        required: true,
                        message: "Please select allowed courses",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Select allowed courses"
                    >
                      <Option value="B.Tech">B.Tech</Option>
                      <Option value="M.Tech">M.Tech</Option>
                      <Option value="BCA">BCA</Option>
                      <Option value="MCA">MCA</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="allowedBranches"
                    label="Allowed Branches"
                    initialValue={companyApplication.allowedBranches}
                    rules={[
                      {
                        required: true,
                        message: "Please select allowed branches",
                      },
                    ]}
                  >
                    <Select
                  
                      mode="multiple"
                      placeholder="Select allowed branches"
                    >
                      { departments && departments.map((item)=>(
        <Option key={item.id} value={item.name}>{item.name}</Option>
                      ))}
                    
                      {/* <Option value="CSE">CSE</Option>
              
                      <Option value="IT">IT</Option>
                      <Option value="EEE">EEE</Option>
                      <Option value="Mechanical">Mechanical</Option> */}
                    </Select>
                  </Form.Item>
                </div>
              </div>

              <Form.Item className="flex justify-center mt-8">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  className="w-full md:w-1/2 h-12 text-lg"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>
      </Content>
    </Layout>
  );
}
