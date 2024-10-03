import React from 'react';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

const AdditionalDetailsForm = ({ form }) => (
  <>
    <Form.Item name="tier" label="Tier" rules={[{ required: true, message: 'Please select the tier' }]}>
      <Select>
        <Option value="dream">Dream</Option>
        <Option value="normal">Normal</Option>
        <Option value="standard">Standard</Option>
      </Select>
    </Form.Item>
    <Form.Item name="branches" label="Branches Allowed" rules={[{ required: true, message: 'Please select the branches' }]}>
      <Select mode="multiple">
        <Option value="btech">B.Tech</Option>
        <Option value="mca">MCA</Option>
        <Option value="mtech">M.Tech</Option>
        <Option value="msc">M.Sc</Option>
      </Select>
    </Form.Item>
    <Form.Item name="role" label="Role Provided" rules={[{ required: true, message: 'Please enter the role' }]}>
      <Input />
    </Form.Item>
  </>
);

export default AdditionalDetailsForm;
