'use client'

import { useState, useEffect } from 'react'
import PageSkeleton from '../shared/PageSkeleton'
import { Form, Input, Button, List, Typography, Collapse, message, Popconfirm } from 'antd'
import { PlusOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, TeamOutlined, DeleteOutlined } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAdminProfile } from '../../react query/api/profile'
import { addDeparment, getAllDepartments, getAllCourses, addCourse, removeDepartment, removeCourse } from '../../react query/api/departments'

const { Title, Text } = Typography
const { Panel } = Collapse

export default function Profile() {
  const [departments, setDepartments] = useState([])
  const [courses, setCourses] = useState([])
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const queryClient = useQueryClient()

  const { data: admin, isLoading: adminLoading } = useQuery({
    queryFn: getAdminProfile,
    queryKey: ['getAdminProfile'],
  })

  const { data: fetchedDepartments, isLoading: departmentLoading, isSuccess: isSuccessDepartment } = useQuery({
    queryFn: getAllDepartments,
    queryKey: ['getAllDepartments'],
  })

  const { data: fetchedCourses, isLoading: courseLoading, isSuccess: isSuccessCourse } = useQuery({
    queryFn: getAllCourses,
    queryKey: ['getAllCourses'],
  })

  const departmentMutation = useMutation({
    mutationFn: addDeparment,
    onSuccess: (data) => {
      setDepartments([...departments, data])
      queryClient.invalidateQueries(['getAllDepartments'])
    },
  })

  const courseMutation = useMutation({
    mutationFn: addCourse,
    onSuccess: (data) => {
      setCourses([...courses, data])
      queryClient.invalidateQueries(['getAllCourses'])
    },
  })

  const removeDepartmentMutation = useMutation({
    mutationFn: removeDepartment,
    onSuccess: (_, variables) => {
      setDepartments(departments.filter(dept => dept.id !== variables.id))
      queryClient.invalidateQueries(['getAllDepartments'])
      message.success('Department removed successfully')
    },
    onError: () => {
      message.error('Failed to remove department')
    },
  })

  const removeCourseMutation = useMutation({
    mutationFn: removeCourse,
    onSuccess: (_, variables) => {
      setCourses(courses.filter(course => course.id !== variables.id))
      queryClient.invalidateQueries(['getAllCourses'])
      message.success('Course removed successfully')
    },
    onError: () => {
      message.error('Failed to remove course')
    },
  })

  useEffect(() => {
    if (isSuccessDepartment && fetchedDepartments) {
      setDepartments(fetchedDepartments)
    }
  }, [isSuccessDepartment, fetchedDepartments])

  useEffect(() => {
    if (isSuccessCourse && fetchedCourses) {
      setCourses(fetchedCourses)
    }
  }, [isSuccessCourse, fetchedCourses])

  const handleAddDepartment = (values) => {
    departmentMutation.mutate(values)
    form.resetFields()
    message.success('Department added successfully')
  }

  const handleAddCourse = (values) => {
    courseMutation.mutate(values)
    form2.resetFields()
    message.success('Course added successfully')
  }

  const handleRemoveDepartment = (id) => {
    removeDepartmentMutation.mutate( id )
  }

  const handleRemoveCourse = (id) => {
    removeCourseMutation.mutate( id )
  }

  if (adminLoading || departmentLoading || courseLoading) {
    return <PageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <Title level={2} className="mb-6">Admin Profile</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserOutlined className="text-blue-500" />
                <Text strong>Name:</Text>
                <Text>{admin.name}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <MailOutlined className="text-blue-500" />
                <Text strong>Email:</Text>
                <Text>{admin.email}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneOutlined className="text-blue-500" />
                <Text strong>Contact:</Text>
                <Text>{admin.contact}</Text>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <IdcardOutlined className="text-blue-500" />
                <Text strong>Admin ID:</Text>
                <Text>{admin.adminId}</Text>
              </div>
              <div className="flex items-center space-x-2">
                <TeamOutlined className="text-blue-500" />
                <Text strong>Position:</Text>
                <Text>{admin.position}</Text>
              </div>
            </div>
          </div>
        </div>

        <Collapse className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <Panel header="Manage Departments" key="1">
            <Form form={form} onFinish={handleAddDepartment} layout="inline" className="mb-4">
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input the department name!' }]}
              >
                <Input placeholder="New department name" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                  Add Department
                </Button>
              </Form.Item>
            </Form>
            <List
              bordered
              dataSource={departments}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Are you sure you want to delete this department?"
                      onConfirm={() => handleRemoveDepartment(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} danger>Delete</Button>
                    </Popconfirm>
                  ]}
                >
                  <Text>{item.name}</Text>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>

        <Collapse className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <Panel header="Manage Courses" key="1">
            <Form form={form2} onFinish={handleAddCourse} layout="inline" className="mb-4">
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input the Course name!' }]}
              >
                <Input placeholder="New Course name" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                  Add Course
                </Button>
              </Form.Item>
            </Form>
            <List
              bordered
              dataSource={courses}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Are you sure you want to delete this course?"
                      onConfirm={() => handleRemoveCourse(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} danger>Delete</Button>
                    </Popconfirm>
                  ]}
                >
                  <Text>{item.name}</Text>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}