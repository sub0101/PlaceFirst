import React, { useState } from 'react';
import { Form, Input, Checkbox } from 'antd';

const InternDetailsForm = ({ form }) => {
  const [isInternPpo, setIsInternPpo] = useState(false);

  return (
    <>
      <Form.Item name="internPpo" label="Intern + PPO" valuePropName="checked">
        <Checkbox onChange={(e) => setIsInternPpo(e.target.checked)}>Is this an intern + PPO offer?</Checkbox>
      </Form.Item>
      {isInternPpo && (
        <Form.Item name="stipend" label="Stipend (Intern)" rules={[{ required: true, message: 'Please enter the stipend' }]}>
          <Input />
        </Form.Item>
      )}
    </>
  );
};

export default InternDetailsForm;
