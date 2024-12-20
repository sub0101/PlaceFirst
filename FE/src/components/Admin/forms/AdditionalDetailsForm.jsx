import React from 'react';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

const AdditionalDetailsForm = ({ form }) => (
  <>
    <Form.Item name="tier" label="Tier" rules={[{ required: true, message: 'Please select the tier' }]}>
      <Select>
        <Option value="DREAM">Dream</Option>
        <Option value="STANDARD">Standard</Option>
        <Option value="NORMAL">Normal</Option>
      </Select>
    </Form.Item>
    <Form.Item name="allowedBranches" label="Courses Allowed" rules={[{ required: true, message: 'Please select the Courses' }]}>
      <Select mode="multiple">
        <Option value="btech">B.Tech</Option>
        <Option value="mca">MCA</Option>
        <Option value="mtech">M.Tech</Option>
        <Option value="msc">M.Sc</Option>
      </Select> 
    </Form.Item>
    <Form.Item name="allowedCourses" label="Branches Allowed" rules={[{ required: true, message: 'Please select the branches' }]}>
      <Select mode="multiple">
        <Option value="cse">CSE</Option>
        <Option value="mca">MCA</Option>
        <Option value="ece">ECE</Option>
        <Option value="ei">EI</Option>
      </Select>
    </Form.Item>
    <Form.Item name="selectionProcess" label="Selection Process" rules={[{ required: true, message: 'Please enter the role' }]}>
      <Input />
    </Form.Item>
  </>
);

export default AdditionalDetailsForm;
