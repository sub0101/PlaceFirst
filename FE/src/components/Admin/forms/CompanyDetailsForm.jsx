import React from 'react';
import { Form, Input } from 'antd';

const CompanyDetailsForm = ({ form }) => (
  <>
    <Form.Item name="company" label="Company Name" rules={[{ required: true, message: 'Please enter the company name' }]}>
      <Input />
    </Form.Item>
    <Form.Item name="ctc" label="CTC (Full Time)" rules={[{ required: true, message: 'Please enter the CTC' }]}>
      <Input />
    </Form.Item>
  </>
);

export default CompanyDetailsForm;
