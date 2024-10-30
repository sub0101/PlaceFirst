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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllDepartments } from "../../../react query/api/departments";
import { updateCompany } from "../../../react query/api/company";
import utc from "dayjs/plugin/utc"
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

// dayjs.extend(utc)
export default function EditCompanyDetails() {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const {data:departments , isLoading }  = useQuery({
    queryFn:getAllDepartments,
    queryKey:['departments']
  })

  const data = useLocation().state|| {}

  const {companyApplication , ...company } = data

  const { mutate:companyMutation, isPending , isError} = useMutation({
    mutationFn:updateCompany,
    mutationKey:"updateCompany",
    onSuccess:(data)=>{
      message.success("Sucessfully Updated data")
      navigate('../manage-companies')
    }
  })
 
  const handleFinish = (values) => {

      const { updatedCompany, updatedCompanyApplication } = (({ name, contactEmail, contactPerson, contactPhone ,   industry, website, location, ...rest }) => ({
       updatedCompany: { name, contactEmail, contactPerson,contactPhone, industry, website, location },
        updatedCompanyApplication: rest,
      }))(values);

      updatedCompany.id = company.id;
      updatedCompanyApplication.id = companyApplication.id
      updatedCompanyApplication.pptDate = dayjs(updatedCompanyApplication.pptDate).endOf('day').utc().format().toString()
    
    companyMutation({company:updatedCompany , companyApplication:updatedCompanyApplication})
      
  
  }

  return (
    <Layout className="min-h-screen bg-gray-100">
     {company &&  <Content className="py-10 px-4">
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
                  name="name"
                  label="Company Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the company name",
                    },
                    
                  
                  ]}
                  initialValue={company?.name}
                >
                  <Input placeholder="Enter company name" />
                </Form.Item>

                <Form.Item
                  name="industry"
                  label="Industry"
                  rules={[
                    { required: true, message: "Please enter the industry" },
                  ]}
                  initialValue={company?.industry}
                >
                  <Input placeholder="Enter industry (e.g., Technology, Finance)" />
                </Form.Item>

                <Form.Item
                  name="website"
                  label="Website"
               
                  initialValue={company?.website}
                >
                  <Input  placeholder="Enter company website" />
                </Form.Item>

                <Form.Item
                  name="location"
                  label="Location"
                  rules={[
                    { required: true, message: "Please enter the location" },
                  ]}
                  initialValue={company?.location}
                >
                  <Input  placeholder="Enter company location" />
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
                  initialValue={company.contactPerson}
                >
                  <Input placeholder="Enter contact person name" />
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
                  initialValue={company.contactEmail}
                >
                  <Input  placeholder="Enter contact email" />
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
                  initialValue={company.contactPhone}
                >
                  <Input placeholder="Enter contact phone" />
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
                  initialValue={companyApplication.jobTitle}
                >
                  <Input  placeholder="Enter job title (e.g., Software Engineer)" />
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
                  initialValue={companyApplication.openRoles}
                >
                  <InputNumber 
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
                  initialValue={companyApplication.ctc}
                >
                  <Input placeholder="Enter CTC (e.g., ₹10,00,000)" />
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
                  initialValue = {companyApplication.stipend}
                >
                  <Input  placeholder="Enter stipend amount (e.g., ₹20,000/month)" />
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
                  initialValue={companyApplication.internshipDuration}
                >
                  <Input  placeholder="Enter internship duration (e.g., 6 months)" />
                </Form.Item>

                <Form.Item
                  name="bondPeriod"
                  label="Bond Period"
                  rules={[
                    { required: true, message: "Please enter the bond period" },
                  ]}
                initialValue={companyApplication.bondPeriod}
                >
                  <Input placeholder="Enter bond period (e.g., 1 year)" />
                </Form.Item>
              </div>

              <Form.Item
                name="jobDescription"
                label="Job Description"
                initialValue={companyApplication.jobDescription}
                rules={[
                  {
                    required: true,
                    message: "Please enter the job description",
                  },
                ]}
              >
                <TextArea 
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
                  initialValue={companyApplication.recruitmentMode}
                > 
                  <Select  placeholder="Select recruitment mode">
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
                  initialValue={dayjs(companyApplication.applicationDeadline)}
                >
                  <DatePicker   className="w-full" />
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
                  initialValue={dayjs(companyApplication.interviewDate)}
                >
                  <DatePicker className="w-full" />
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
                  initialValue={dayjs(companyApplication.pptDate)}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </div>  

              <Form.Item
                name="selectionProcess"
                label="Selection Process"
                initialValue={companyApplication.selectionProcess}
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
                      // required: true,
                      message: "Please enter eligibility criteria",
                    },
                  ]}
                  initialValue={companyApplication.eligibilityCriteria}
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
                    initialValue={companyApplication.allowedCourses}
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
                  
                    rules={[
                      {
                        required: true,
                        message: "Please select allowed branches",
                      },
                    ]}
                    initialValue={companyApplication.allowedBranches}
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
                  loading={isPending}
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
}
    </Layout>
  );
}
