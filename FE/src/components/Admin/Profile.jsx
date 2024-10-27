'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import PageSkeleton from '../shared/PageSkeleton'
import { Form, Input, Button, List, Typography, Collapse, message, Skeleton } from 'antd'
import { PlusOutlined, UserOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, TeamOutlined } from '@ant-design/icons'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { getAdminProfile } from '../../react query/api/profile'
import { addDeparment, getAllDepartments,getAllCourses , addCourse } from '../../react query/api/departments'

const { Title, Text } = Typography
const { Panel } = Collapse

export default function Profile() {
  // const [admin, setAdmin] = useState(initialAdmin)
  // const [departments, setDepartments] = useState(['HR', 'IT', 'Finance'])
  const [departments  ,setDepartments] = useState([])
  const [courses  , setCourses] = useState([])
  const [form] = Form.useForm()
  const [form2] = Form.useForm()
  const {data:admin , isLoading:adminLoading , isSuccess:isSuccessDepartment} = useQuery({
    queryFn:getAdminProfile,
    queryKey:['getAdminProfile'],

  })
  const {data:fetchedDepartments , isLoading:departmentLoadig} = useQuery({
    queryFn:getAllDepartments,
    queryKey:['getAllDepartments']

  })
  const {data:fetchedCourses , isLoading:courseLoadig , isSuccess:isSuccessCourse} = useQuery({
    queryFn:getAllCourses,
    queryKey:['getAllCourses']

  })
  const departmentMutation = useMutation({
    mutationFn:addDeparment,
  mutationKey:"addDepartment",
  onSuccess:(data) =>{
    setDepartments([...departments , data])
  }
  
    })
    
  const coursetMutation = useMutation({
  mutationFn:addCourse,
mutationKey:"addCourse",
onSuccess:(data) =>{
  setCourses([...courses, data])
}

  })

  useEffect(() => {
    if (isSuccessDepartment && fetchedDepartments) {
      setDepartments(fetchedDepartments); // Set the fetched departments only once after successful data fetch
    }
   
  }, [isSuccessDepartment, fetchedDepartments]);
  useEffect(() => {
    if(isSuccessCourse && fetchedCourses) setCourses(fetchedCourses)
   
  }, [isSuccessCourse , fetchedCourses]);


  const handleAddDepartment = (values) => {
    departmentMutation.mutate(values)
    form.resetFields()

   
    message.success('Department added successfully')
  }
  const handleAddCourse = (value) =>{
    coursetMutation.mutate(value)
    form2.resetFields()
  }
  return (
    <>
    { adminLoading && departmentLoadig ?<PageSkeleton />  :<div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
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
                <List.Item>
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
                <List.Item>
                  <Text>{item.name}</Text>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </div>
    </div>
    }
    </>
  
  )
}