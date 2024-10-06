import React, { useState } from 'react';
import { Form, Input, Checkbox, Row, Col } from 'antd';

const JobDescriptionForm = ({ form }) => {
  const [isInternPpo, setIsInternPpo] = useState(false);

  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #f0f0f0', borderRadius: '6px', backgroundColor: '#f7f7f7' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[{ required: true, message: 'Please enter the job title' }]}
          >
            <Input style={inputStyle} placeholder="Enter job title" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="typeOfHiring"
            label="Type of Hiring"
            rules={[{ required: true, message: 'Please enter the type of hiring' }]}
          >
            <Input style={inputStyle} placeholder="Enter type of hiring" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="jobDescription"
        label="Job Description"
        rules={[{ required: true, message: 'Please enter the job description' }]}
      >
        <Input.TextArea rows={3} style={inputStyle} placeholder="Enter job description" />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="ctc"
            label="CTC"
            rules={[{ required: true, message: 'Please enter the CTC' }]}
          >
            <Input style={inputStyle} placeholder="Enter CTC" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Checkbox onChange={(e) => setIsInternPpo(e.target.checked)}>
              Is this an intern + PPO offer?
            </Checkbox>
          </Form.Item>
        </Col>
      </Row>

      {isInternPpo && (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="stipend"
              label="Stipend (Intern)"
              rules={[{ required: true, message: 'Please enter the stipend' }]}
            >
              <Input style={inputStyle} placeholder="Enter stipend for internship" />
            </Form.Item>
          </Col>

          <Col span={12}>
          <Form.Item
            name="durationOfInternship"
            label="Duration of Internship"
            rules={[{ required: true, message: 'Please enter the Duration' }]}
          >
            <Input style={inputStyle}
      
            placeholder="Enter duration of internship (if applicable)" />
          </Form.Item>
        </Col> 
        </Row>
      )}

      <Form.Item
        name="eligibilityCriteria"
        label="Eligibility Criteria"
        rules={[{ required: true, message: 'Please enter the eligibility criteria' }]}
      >
        <Input style={inputStyle} placeholder="Enter eligibility criteria" />
      </Form.Item>

      <Row gutter={[16, 16]}>
      {/* {isInternPpo && ( 
      )} */}
        <Col span={12}>
          <Form.Item
            name="bondPeriod"
            label="Bond Period"
          >
            <Input style={inputStyle} placeholder="Enter bond period (if applicable)" />
          </Form.Item>
        </Col>
        <Col span={12} >
        <Form.Item
        name="openRoles"
        label="Open Roles"
        rules={[{ required: true, message: 'Please enter the number of open roles' }]}
      >
        <Input style={inputStyle} placeholder="Enter number of open roles" />
      </Form.Item>
        </Col>
      </Row>

   
    </div>
  );
};

export default JobDescriptionForm;
