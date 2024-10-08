import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Row, Col, message, DatePicker,Select } from 'antd';

const CompanyDetailsForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();



  return (
    <div
      layout="vertical" 
      style={{
        padding: '24px',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
     
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
          name="name"
            label="Company Name"
            validateStatus={errors.company ? 'error' : ''}
            help={errors.company?.message}
            rules={[{ required: true, message: 'Please enter the company name' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
          name="location"
            label="Location"
            validateStatus={errors.location ? 'error' : ''}
            help={errors.location?.message}
            rules={[{ required: true, message: 'Please enter the location' }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
                    name="industry"
            label="Industry"
            validateStatus={errors.industry ? 'error' : ''}
            help={errors.industry?.message}
            rules={[{ required: true, message: 'Please enter the industry' }]}
          >
            <Input placeholder="Enter industry" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
          name="contactPerson"
            label="Contact Person"
            validateStatus={errors.contactPerson ? 'error' : ''}
            help={errors.contactPerson?.message}
            rules={[{ required: true, message: 'Please enter the contact person' }]}
          >
            <Input placeholder="Enter contact person" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
          name="contactEmail"
            label="Contact Email"
            validateStatus={errors.contactEmail ? 'error' : ''}
            help={errors.contactEmail?.message}
            rules={[
              { required: true, message: 'Please enter the contact email' },
              { pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Invalid email address' }
            ]}
          >
            <Input placeholder="Enter contact email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
          name="contactPhone"
            label="Contact Phone"
            validateStatus={errors.contactPhone ? 'error' : ''}
            help={errors.contactPhone?.message}
            rules={[
              { required: true, message: 'Please enter the contact phone' },
              { pattern: /^[0-9]+$/, message: 'Invalid phone number' }
            ]}
          >
            <Input placeholder="Enter contact phone" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
          name="visitDate"
            label="Visit Date"
            validateStatus={errors.visitDate ? 'error' : ''}
            help={errors.visitDate?.message}
            rules={[{ required: true, message: 'Please enter the visit date' }]}
          >
           <DatePicker />
          </Form.Item>
        
        </Col>
        <Col span={6} >
        <Form.Item
          name="status"
            label="Current Status"
            validateStatus={errors.visitDate ? 'error' : ''}
            help={errors.visitDate?.message}
            rules={[{ required: true, message: 'Please enter Status' }]}
          >
          <Select mode="single">
        <Option value="ongoing">Ongoing</Option>
        <Option value="upcoming">Upcoming</Option>
        <Option value="completed">Completed</Option>
  
      </Select>
          </Form.Item>
        </Col>
      </Row>

    </div>
  );
};

export default CompanyDetailsForm;
