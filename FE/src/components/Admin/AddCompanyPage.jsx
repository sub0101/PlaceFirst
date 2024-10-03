import React, { useState } from 'react';
import { Form, Button, Typography } from 'antd';
import CompanyDetailsForm from './forms/CompanyDetailsForm';
import InternDetailsForm from './forms/InternDetailsForm';
import DateDetailsForm from './forms/DateDetailsForm';
import AdditionalDetailsForm from './forms/AdditionalDetailsForm';


const { Title } = Typography;

const AddCompanyPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Company Details', component: <CompanyDetailsForm form={form} /> },
    { title: 'Intern Details', component: <InternDetailsForm form={form} /> },
    { title: 'Date Details', component: <DateDetailsForm form={form} /> },
    { title: 'Additional Details', component: <AdditionalDetailsForm form={form} /> },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddCompany = (values) => {
    console.log('Received values:', values);
    // You can add your logic to add the new company to the data source here
  };

  return (
    <div className="container mx-auto p-4">
      <Title level={2}>Add New Company</Title>
      <Form form={form} onFinish={handleAddCompany} layout="vertical">
        <div className="transition transform duration-500">
          {steps[currentStep].component}
        </div>
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <Button onClick={prev}>
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              Next
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AddCompanyPage;
