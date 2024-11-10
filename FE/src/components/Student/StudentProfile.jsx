import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Form, Input, Button, Card, Typography, Select, Divider, message, Upload, Avatar, Row, Col, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, SaveOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStudentProfile, updateProfile, saveEducation } from '../../react query/api/profile';
import { getAllDepartments, getAllCourses } from '../../react query/api/departments';

const { Title } = Typography;
const { Option } = Select;

export default function StudentProfile() {
  const [imageUrl, setImageUrl] = useState(null);
  const { control, handleSubmit, reset, formState: { errors }, watch } = useForm({
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

  const { data: fetchedCourses, isLoading: courseLoading } = useQuery({
    queryFn: getAllCourses,
    queryKey: ['getAllCourses']
  });

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      message.success('Profile updated successfully!');
    },
    onError: () => {
      message.error('Failed to update profile');
    }
  });

  const educationMutation = useMutation({
    mutationFn: saveEducation,
    onSuccess: () => {
      message.success('Education entry saved successfully!');
    },
    onError: () => {
      message.error('Failed to save education entry');
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
    studentInfo.courseId = Number(studentInfo.course?.id);
    const finalData = { education, studentInfo };
    profileMutation.mutate(finalData);
  };

  const handleSaveEducation = (index) => {
    const educationEntry = watch(`education.${index}`);
    educationMutation.mutate(educationEntry);
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
    { name: 'specialization', label: 'Specialization', placeholder: 'e.g., Computer Science' },
    {name:"grade" , label :"Grade" , placeholder:"e.g.. 8.2 CGPA /80 % "}
  ];

  if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;
  if (isError) return <Title level={3} className="text-center text-red-500">Error loading profile</Title>;

  return (
    <Card 
      title={<Title level={2} className="text-center">Student Profile</Title>} 
      className="max-w-4xl mx-auto shadow-lg"
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="space-y-6">
        <Row justify="center" className="mb-8">
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
                <div className="flex flex-col items-center justify-center">
                  <PlusOutlined />
                  <div className="mt-2">Upload</div>
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
                  <Input {...field} prefix={<UserOutlined />} className="rounded-md" />
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
                  <Input {...field} disabled prefix={<MailOutlined />} className="rounded-md" />
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
                  <Input {...field} disabled prefix={<IdcardOutlined />} className="rounded-md" />
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
                  <Input {...field} prefix={<PhoneOutlined />} className="rounded-md" />
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
                  <Select {...field} placeholder="Select your branch" className="rounded-md">
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
                  <Select
                    placeholder="Select your course"
                    value={field.value?.name}
                    onChange={(value, option) => {
                      field.onChange({ id: option.key, name: value });
                    }}
                    className="rounded-md"
                  >
                    {!courseLoading && fetchedCourses?.map((item) => (
                      <Option key={item.id} value={item.name}>{item.name}</Option> 
                    ))}
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
                    className="rounded-md"
                  >
                    {!departmentLoading && departments?.map((item) => (
                      <Option key={item.id} value={item.name}>{item.name}</Option> 
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </Col>
        </Row>

        <Divider orientation="left" className="text-lg font-semibold">Education</Divider>

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
                className="mb-6 shadow-md" 
                title={`Education ${index + 1}`}
                extra={
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleSaveEducation(index)}
                      icon={<SaveOutlined />}
                      type="primary"
                      ghost
                    >
                      Save
                    </Button>
                    <Button 
                      onClick={() => remove(index)}
                      icon={<DeleteOutlined />}
                      danger
                    />
                  </div>
                }
              >
                <Row gutter={[16, 16]}>
                  {educationFields.map((eduField) => (
                    <Col xs={24} sm={12} key={eduField.name}>
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
                            <Input {...field} placeholder={eduField.placeholder} className="rounded-md" />
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
          onClick={() => append({ degree: '', institution: '', year: '', specialization: '' })} 
          block 
          icon={<PlusOutlined />}
          className="mb-6"
        >
          Add Education
        </Button>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block className="h-12 text-lg font-semibold">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}