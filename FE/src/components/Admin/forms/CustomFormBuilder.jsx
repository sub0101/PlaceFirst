import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined, EyeOutlined,
  CopyOutlined, ArrowUpOutlined, ArrowDownOutlined, SettingOutlined
} from '@ant-design/icons';
import { 
  Input, Select, Button, Switch, message, Modal, Form, Card, Tooltip,
  Radio, Checkbox, InputNumber, DatePicker, TimePicker, Rate, Slider, Upload
} from 'antd';
import { useMutation } from '@tanstack/react-query';
import { saveForm } from '../../../react query/api/application';

const { Option } = Select;
const { TextArea } = Input;

const fieldTypes = [
  { value: 'text', label: 'Short answer' },
  { value: 'textarea', label: 'Paragraph' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'radio', label: 'Multiple choice' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'select', label: 'Dropdown' },
  { value: 'date', label: 'Date' },
  { value: 'time', label: 'Time' },
  { value: 'rating', label: 'Rating' },
  { value: 'slider', label: 'Linear scale' },
  { value: 'file', label: 'File upload' },
];

export default function EnhancedGoogleFormsLikeBuilder({ fields , setFields }) {
  // const [fields, setFields] = useState(initialFields);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [form] = Form.useForm();
  const [previewForm] = Form.useForm();
  const formMutation = useMutation({
    mutationFn: saveForm,
    mutationKey: 'form'
  });

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

  const duplicateField = (index) => {
    const newField = { ...fields[index], label: `${fields[index].label} (Copy)` };
    setFields([...fields.slice(0, index + 1), newField, ...fields.slice(index + 1)]);
  };

  const moveField = (index, direction) => {
    if ((direction === -1 && index > 0) || (direction === 1 && index < fields.length - 1)) {
      const newFields = [...fields];
      [newFields[index], newFields[index + direction]] = [newFields[index + direction], newFields[index]];
      setFields(newFields);
    }
  };

  const handlePreview = () => {
    setIsPreviewModalVisible(true);
  };

  const handlePreviewSubmit = (values) => {
    console.log('Form submitted with values:', values);
    message.success('Form submitted successfully!');
    setIsPreviewModalVisible(false);
  };

  const handleSave = () => {
    console.log(fields);
    formMutation.mutate(fields);
    message.success('Form saved successfully!');
  };

  const renderPreviewField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please input your ${field.label}!` }]}
          >
            <Input />
          </Form.Item>
        );
      case 'textarea':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please input your ${field.label}!` }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        );
      case 'number':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please input your ${field.label}!` }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        );
      case 'email':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[
              { required: field.required, message: `Please input your ${field.label}!` },
              { type: 'email', message: 'Please enter a valid email address!' }
            ]}
          >
            <Input type="email" />
          </Form.Item>
        );
      case 'radio':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please select your ${field.label}!` }]}
          >
            <Radio.Group>
              {field.options.map((option, index) => (
                <Radio key={index} value={option}>{option}</Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case 'checkbox':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please select your ${field.label}!` }]}
          >
            <Checkbox.Group>
              {field.options.map((option, index) => (
                <Checkbox key={index} value={option}>{option}</Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please select your ${field.label}!` }]}
          >
            <Select>
              {field.options.map((option, index) => (
                <Option key={index} value={option}>{option}</Option>
              ))}
            </Select>
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please select a date for ${field.label}!` }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        );
      case 'time':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please select a time for ${field.label}!` }]}
          >
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>
        );
      case 'rating':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please rate ${field.label}!` }]}
          >
            <Rate />
          </Form.Item>
        );
      case 'slider':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please select a value for ${field.label}!` }]}
          >
            <Slider min={0} max={10} marks={{ 0: '0', 10: '10' }} />
          </Form.Item>
        );
      case 'file':
        return (
          <Form.Item
            name={field.label}
            label={field.label}
            rules={[{ required: field.required, message: `Please upload a file for ${field.label}!` }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a new form</h1>
          <div className="mb-6 flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
              <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                Add question
              </Button>
              <Button onClick={handlePreview} icon={<EyeOutlined />}>
                Preview
              </Button>
            </div>
            <Button type="primary" onClick={handleSave} icon={<SaveOutlined />}>
              Save form
            </Button>
          </div>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className="w-full hover:shadow-lg transition-shadow duration-300"
                  actions={[
                    <Tooltip title="Edit">
                      <EditOutlined key="edit" onClick={() => editField(index)} />
                    </Tooltip>,
                    <Tooltip title="Delete">
                      <DeleteOutlined key="delete" onClick={() => deleteField(index)} />
                    </Tooltip>,
                    <Tooltip title="Duplicate">
                      <CopyOutlined key="duplicate" onClick={() => duplicateField(index)} />
                    </Tooltip>,
                    <Tooltip title="Move Up">
                      <ArrowUpOutlined key="moveUp" onClick={() => moveField(index, -1)} />
                    </Tooltip>,
                    <Tooltip title="Move Down">
                      <ArrowDownOutlined key="moveDown" onClick={() => moveField(index, 1)} />
                    </Tooltip>,
                  ]}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-lg font-medium">{field.label}</h3>
                      <p className="text-sm text-gray-500">{fieldTypes.find(t => t.value === field.type)?.label}</p>
                    </div>
                    {field.required && (
                      <span className="text-red-500 text-sm mt-2 sm:mt-0">Required</span>
                    )}
                  </div>
                  {field.options && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Options: {field.options.join(', ')}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Modal
        title={editingField !== null ? "Edit question" : "Add new question"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddField} layout="vertical">
          <Form.Item
            name="label"
            label="Question"
            rules={[{ required: true, message: 'Please input the question!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="Answer type"
            rules={[{ required: true, message: 'Please select the answer type!' }]}
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
              ['radio', 'checkbox', 'select'].includes(getFieldValue('type')) && (
                <Form.Item
                  name="options"
                  label="Options (comma-separated)"
                  rules={[{ required: true, message: 'Please input the options!' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingField !== null ? "Update question" : "Add question"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Form Preview"
        visible={isPreviewModalVisible}
        onCancel={() => setIsPreviewModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form form={previewForm} onFinish={handlePreviewSubmit} layout="vertical">
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              {renderPreviewField(field)}
            </React.Fragment>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}