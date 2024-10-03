import React from 'react';
import { Form, DatePicker } from 'antd';

const DateDetailsForm = ({ form }) => (
  <>
    <Form.Item name="prePlacementTalk" label="Date of Pre-Placement Talk" rules={[{ required: true, message: 'Please select the date' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item name="assessment" label="Date of Assessment" rules={[{ required: true, message: 'Please select the date' }]}>
      <DatePicker />
    </Form.Item>
    <Form.Item name="interview" label="Date of Interview" rules={[{ required: true, message: 'Please select the date' }]}>
      <DatePicker />
    </Form.Item>
  </>
);

export default DateDetailsForm;
