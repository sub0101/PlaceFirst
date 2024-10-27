import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, Input, Button, Card, Typography, Select, Divider, message, Upload, Avatar, Row, Col, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudentProfile, updateProfile } from '../../react query/api/profile';
import { getAllDepartments,getAllCourses } from '../../react query/api/departments';

const { Title } = Typography;
const { Option } = Select;

export default function StudentProfile() {
  const [imageUrl, setImageUrl] = useState(null);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      studentId: '',
      contact: '',
      branch: '',
      course: '',
      department: { id: '', name: '' },
      education: []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  const { data: userProfile, isError, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getStudentProfile,
  });

  const { data: departments, isLoading: departmentLoading } = useQuery({
    queryFn: getAllDepartments,
    queryKey: ['departments']
  });
  const {data:fetchedCourses , isLoading:courseLoadig , isSuccess:isSuccessCourse} = useQuery({
    queryFn:getAllCourses,
    queryKey:['getAllCourses']

  })

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      message.success('Profile updated successfully!');
    },
    onError: () => {
      message.error('Failed to update profile');
    }
  });

  useEffect(() => {
    if (userProfile) {
      reset(userProfile);
      setImageUrl(userProfile.avatarUrl);
    }
  }, [userProfile, reset]);

  const onSubmit = (data) => {
    const { education, ...studentInfo } = data;
    studentInfo.departmentId = Number(studentInfo.department?.id);
    studentInfo.courseId  = Number(studentInfo.course?.id)
    const finalData = { education, studentInfo };
    profileMutation.mutate(finalData);
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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const educationFields = [
    { name: 'degree', label: 'Degree', placeholder: 'e.g., Bachelor of Science' },
    { name: 'institution', label: 'Institution', placeholder: 'e.g., University of Technology' },
    { name: 'year', label: 'Year', placeholder: 'e.g., 2023' },
  ];

  if (isLoading) return <Spin size="large" />;
  if (isError) return <Title level={3}>Error loading profile</Title>;

  return (
    <Card 
      title={<Title level={2}>Student Profile</Title>} 
      style={{ maxWidth: 1000, margin: '0 auto' }}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row justify="center" style={{ marginBottom: 24 }}>
          <Col>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeImageUpload}
              onChange={handleImageUpload}
              customRequest={({ onSuccess }) => {
                setTimeout(() => {
                  onSuccess?.("ok");
                }, 0);
              }}
            >
              {imageUrl ? (
                <Avatar size={100} src={imageUrl} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Col>
        </Row>

        <Row gutter={[32, 16]}>
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
                    {!departmentLoading && departments?.map((item) => (
                      <Option key={item.id} value={item.name}>{item.name}</Option> 
                    ))}
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
                  <Select  placeholder="Select your course"
                  value={field.value?.name}
                  onChange={(value, option) => {
                    field.onChange({ id: option.key, name: value });
                  }}
                  >
                  {!courseLoadig && fetchedCourses?.map((item) => (
                      <Option key={item.id} value={item.name}>{item.name}</Option> 
                    ))}
                    {/* <Option value="btech">B.Tech</Option>
                    <Option value="mtech">M.Tech</Option>
                    <Option value="phd">Ph.D</Option>
                    <Option value="mca">MCA</Option>
                    <Option value="msc">MSC</Option> */}
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
                  <Select 
                    placeholder="Select your department"
                    value={field.value?.name}
                    onChange={(value, option) => {
                      field.onChange({ id: option.key, name: value });
                    }}
                  >
                    {!departmentLoading && departments?.map((item) => (
                      <Option key={item.id} value ={item.name}>{item.name}</Option> 
                    ))}
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
        <Button 
          type="dashed" 
          onClick={() => append({ degree: '', institution: '', year: '' })} 
          block 
          icon={<PlusOutlined />}
          style={{ marginBottom: 16 }}
        >
          Add Education
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}