import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Select,
  Divider,
  message,
  Upload,
  Avatar,
  Row,
  Col,
  Spin,
} from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudentProfile, updateProfile } from '../../react query/api/profile';

const { Title } = Typography;
const { Option } = Select;

export default function StudentProfile() {
  const [imageUrl, setImageUrl] = useState(null);
  const { control, handleSubmit, reset, formState: { errors, dirtyFields } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  const { data: userProfile, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getStudentProfile,
  });

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["updateProfile"],
    onSuccess: (data) => {
      console.log(data);
      message.success('Profile updated successfully!');
    },
    onError: (err) => {
      console.error(err);
      message.error('Failed to update profile');
    }
  });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
    }
  }, [userProfile, reset]);

  const onSubmit = (data) => {
    // console.log(data)
    const changedValues = {};
    const {education , ...studentInfo} = data
    console.log(education)
    console.log(studentInfo)
    // Object.keys(dirtyFields).forEach(key => {
    //   if (key === 'education') {
    //     changedValues.education = data.education.filter((_, index) => dirtyFields.education[index]);
    //   } else {
    //     changedValues[key] = data[key];
    //   }
    // });
    // console.log(data)
// console.log(changedValues)
    // if (Object.keys(changedValues).length > 0) {
    //   // profileMutation.mutate(changedValues); 
    // } else {
    //   message.info('No changes detected');
    // }
    const finaldata = {education , studentInfo}
    console.log(finaldata)
    profileMutation.mutate(finaldata)

    // reset()
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeImageUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG files!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const educationFields = [
    { name: 'degree', label: 'Degree', placeholder: 'e.g., Bachelor of Science' },
    { name: 'institution', label: 'Institution', placeholder: 'e.g., University of Technology' },
    { name: 'year', label: 'Year', placeholder: 'e.g., 2023' },
  ];

  if (isLoading) return <div><Spin  /> </div>;
  if (isError) return <div>Error loading profile</div>;
  return (
    <Card 
      title={<Title level={2}>Student Profile</Title>} 
      style={{ maxWidth: 1000, margin: '0 auto' }}
    >
      <Row justify="center" style={{ marginBottom: 24 }}>
        <Col>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeImageUpload}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleImageUpload}
            customRequest={({ onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
          >
            {imageUrl ? (
              <Avatar size={100} src={imageUrl} />
            ) : (
              <Avatar size={100} icon={<UserOutlined />} />
            )}
          </Upload>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Please input your name!' }}
              render={({ field }) => (
                <Form.Item
                  label="Full Name"
                  validateStatus={errors.name ? 'error' : ''}
                  help={errors.name?.message}
                >
                  <Input {...field} prefix={<UserOutlined />} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Controller
              name="email"
              control={control}
              rules={{ 
                required: 'Please input your email!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email!"
                }
              }}
              render={({ field }) => (
                <Form.Item
                  label="Email"
                  validateStatus={errors.email ? 'error' : ''}
                  help={errors.email?.message}
                >
                  <Input {...field} disabled prefix={<MailOutlined />} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Controller
              name="studentId"
              control={control}
              rules={{ required: 'Please input your student ID!' }}
              render={({ field }) => (
                <Form.Item
                  label="Student ID"
                  validateStatus={errors.studentId ? 'error' : ''}
                  help={errors.studentId?.message}
                >
                  <Input {...field} disabled prefix={<IdcardOutlined />} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <Form.Item label="Contact Number">
                  <Input {...field} prefix={<PhoneOutlined />} />
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Controller
              name="branch"
              control={control}
              render={({ field }) => (
                <Form.Item label="Branch">
                  <Select {...field} placeholder="Select your branch">
                    <Option value="computer_science">Computer Science</Option>
                    <Option value="information_technology">Information Technology</Option>
                    {/* Add other options here */}
                  </Select>
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Form.Item label="Course">
                  <Select {...field} placeholder="Select your course">
                    <Option value="btech">B.Tech</Option>
                    <Option value="mtech">M.Tech</Option>
                    <Option value="phd">Ph.D</Option>
                    <Option value="mca">MCA</Option>
                    <Option value="msc">MSC</Option>
                  </Select>
                </Form.Item>
              )}
            />
          </Col>
          <Col xs={24} sm={8}>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <Form.Item label="Department">
                  <Select {...field} placeholder="Select your department">
                    <Option value="computer_science">Computer Science</Option>
                    <Option value="information_technology">Information Technology</Option>
                    {/* Add other options here */}
                  </Select>
                </Form.Item>
              )}
            />
          </Col>
        </Row>

        <Divider orientation="left">Education</Divider>

        <AnimatePresence>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                style={{ marginBottom: 16 }} 
                extra={<DeleteOutlined onClick={() => remove(index)} />}
              >
                <Row gutter={[16, 16]}>
                  {educationFields.map((eduField) => (
                    <Col xs={24} sm={8} key={eduField.name}>
                      <Controller
                        name={`education.${index}.${eduField.name}`}
                        control={control}
                        rules={{ required: `Missing ${eduField.name}` }}
                        render={({ field }) => (
                          <Form.Item
                            label={eduField.label}
                            validateStatus={errors.education?.[index]?.[eduField.name] ? 'error' : ''}
                            help={errors.education?.[index]?.[eduField.name]?.message}
                          >
                            <Input {...field} placeholder={eduField.placeholder} />
                          </Form.Item>
                        )}
                      />
                    </Col>
                  ))}
                </Row>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        <Button type="dashed" onClick={() => append({ degree: '', institution: '', year: '' })} block icon={<PlusOutlined />}>
          Add Education
        </Button>

        <Form.Item style={{ marginTop: '20px' }}>
          <Button type="primary" htmlType="submit" size="large">
            Update Profile
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
}