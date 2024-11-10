import React from 'react';
import { Form, Input, Select, Switch, Button, Typography, Spin } from 'antd';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getForm } from '../../../react query/api/application';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
const { Title, Text } = Typography;
import { message } from 'antd';
import { applyCompany } from '../../../react query/api/application';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../../utils/auth/getUserInfo';
const CustomApplication = () => {

  const [form] = Form.useForm();
  const companyid = useParams().id
  const {id:studentId}  = getUserInfo()
  const { data: fields, isLoading } = useQuery({
    queryFn: getForm,
    queryKey: ['getForm']
  });

  const applicationMutation = useMutation({
    mutationFn:applyCompany,
    mutationKey:"application",
    onSuccess:(data)=>{ 
      message.success("Succcesflly applied " , 2)
     
  
    },
    onError:(err)=>{
      console.log()
     message.error( err.response.data.message)
    }
  })
  const renderField = (field) => {
    const commonProps = {
      key: field.label,
      name: field.label,
      label: <Text strong>{field.label}</Text>,
      rules: [{ required: field.required, message: `Please input your ${field.label}!` }],
      className: "mb-6"
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Form.Item {...commonProps}>
            <Input 
              type={field.type} 
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500" 
            />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item {...commonProps}>
            <Select className="rounded-lg">
              {field.options.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'switch':
        return (
          <Form.Item {...commonProps} valuePropName="checked">
            <Switch />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (values) => {
    // onSubmit(values);
    console.log(values)
    values.companyApplicatinId = companyid
    values.studentId = studentId;
    applicationMutation.mutate(values)

    // form.resetFields();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden"
    >
      <div className="px-8 py-6 bg-gradient-to-r from-gray-100 to-gray-200">
        <Title level={2} className="text-gray-800 m-0 flex items-center">
          <CheckCircleOutlined className="mr-2 text-green-500" />
          Application Form
        </Title>
        <Text className="text-gray-600 mt-2">Please fill out the form below</Text>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="p-8 space-y-6"
      >
        {fields?.map(renderField)}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 border-0 rounded-lg h-12 text-lg font-semibold transition-colors duration-300"
          >
            Submit Application
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default CustomApplication;