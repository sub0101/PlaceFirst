import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Input, Select, Button, Switch, message, Modal, Form } from 'antd';

const { Option } = Select;

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'select', label: 'Select' },
  { value: 'switch', label: 'Switch' },
];

export default function CustomFormBuilder() {
  const [fields, setFields] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingField(null);
  };

  const handleAddField = (values) => {
    if (editingField !== null) {
      setFields(fields.map((field, index) => 
        index === editingField ? { ...values, options: values.options ? values.options.split(',').map(opt => opt.trim()) : [] } : field
      ));
      setEditingField(null);
    } else {
      setFields([...fields, { ...values, options: values.options ? values.options.split(',').map(opt => opt.trim()) : [] }]);
    }
    setIsModalVisible(false);
  };

  const editField = (index) => {
    const field = fields[index];
    form.setFieldsValue({
      ...field,
      options: field.options ? field.options.join(', ') : '',
    });
    setEditingField(index);
    setIsModalVisible(true);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handlePreview = () => {
    message.success('Form preview: ' + JSON.stringify(fields));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Custom Form Creator</h1>
          <div className="mb-6 flex justify-between items-center">
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
              Add Field
            </Button>
            <Button onClick={handlePreview}>Preview Form</Button>
          </div>
          {fields.map((field, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{field.label}</h3>
                <p className="text-sm text-gray-500">{field.type}</p>
              </div>
              <div>
                <Button onClick={() => editField(index)} icon={<EditOutlined />} className="mr-2" />
                <Button onClick={() => deleteField(index)} icon={<DeleteOutlined />} danger />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Modal
        title={editingField !== null ? "Edit Field" : "Add New Field"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddField} layout="vertical">
          <Form.Item
            name="label"
            label="Field Label"
            rules={[{ required: true, message: 'Please input the field label!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Field Type"
            rules={[{ required: true, message: 'Please select the field type!' }]}
          >
            <Select>
              {fieldTypes.map(type => (
                <Option key={type.value} value={type.value}>{type.label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="required"
            label="Required"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) => 
              getFieldValue('type') === 'select' && (
                <Form.Item
                  name="options"
                  label="Options (comma-separated)"
                  rules={[{ required: true, message: 'Please input the options!' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              {editingField !== null ? "Update Field" : "Add Field"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}