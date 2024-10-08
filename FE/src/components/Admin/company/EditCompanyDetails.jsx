import React, { useState } from 'react';
import { Layout, Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const EditCompanyDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
console.log("edit company")
  const handleFinish = (values) => {
    
    setLoading(true);
    // Simulate API call to save data
    setTimeout(() => {
      message.success('Company details updated successfully!');
      setLoading(false);
      navigate('/dashboard'); // Redirect after saving
    }, 1500);
  };

  return (
    <Layout className="min-h-screen">
      <Content className="flex justify-center items-center py-10">
        <Card className="w-full max-w-2xl shadow-md bg-white p-6">
          <Title level={2} className="text-center mb-6">
            Edit Company Details
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="space-y-4"
          >
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[{ required: true, message: 'Please enter the company name' }]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>

            <Form.Item
              name="companyType"
              label="Company Type"
              rules={[{ required: true, message: 'Please specify the company type' }]}
            >
              <Input placeholder="Enter company type (e.g., Product/Service)" />
            </Form.Item>

            <Form.Item
              name="ctc"
              label="CTC"
              rules={[{ required: true, message: 'Please enter the CTC offered' }]}
            >
              <Input placeholder="Enter CTC (e.g., ₹10,00,000)" />
            </Form.Item>

            <Form.Item
              name="applicationDeadline"
              label="Application Deadline"
              rules={[{ required: true, message: 'Please enter the application deadline' }]}
            >
              <Input placeholder="Enter application deadline (e.g., 25th Oct 2024)" />
            </Form.Item>

            <Form.Item
              name="totalApplicants"
              label="Total Applicants"
              rules={[{ required: true, message: 'Please enter the number of applicants' }]}
            >
              <Input placeholder="Enter number of applicants (e.g., 50)" />
            </Form.Item>

            <Form.Item className="flex justify-center">
              <Button type="primary" htmlType="submit" loading={loading} className="w-1/2">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default EditCompanyDetails;
