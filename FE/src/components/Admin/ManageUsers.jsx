import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Typography, Space, Tag, Spin } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '../../react query/api/profile';
import { getAllCourses,getAllDepartments } from '../../react query/api/departments';

const { Title } = Typography;
const { Option } = Select;

export default function ManageUsers() {
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');       
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryFn: getAllStudents,
    queryKey: ['allStudents'],
  });

  const { data: departments, isLoading: departmentsLoading } = useQuery({
    queryFn: getAllDepartments,
    queryKey: ['departments'],
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryFn: getAllCourses,
    queryKey: ['getAllCourses'],
  });

  useEffect(() => {
    if (students) {
      const filtered = students.filter(student => 
        (selectedCourse ? student.course.name === selectedCourse : true) &&
        (selectedDepartment ? student.department?.name === selectedDepartment : true) &&
        (searchText ? student.studentId.toLowerCase().includes(searchText.toLowerCase()) : true)
      );
      setFilteredStudents(filtered);
    }
  }, [searchText, selectedCourse, selectedDepartment, students]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link href={`/student/${record.id}`} className="text-blue-600 hover:text-blue-800">
          {text}
        </Link>
      ),
    },
    { title: 'Enrollment', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Course', dataIndex: 'course', key: 'course', render:(text ,value)=> {
      return value.course.name
      } },
    { title: 'Department', dataIndex: ['department', 'name'], key: 'department' ,

      render:(text ,value)=> {
      return value.department.name
      }
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const color = status ? "green" : "red";
        const text = status ? "Placed" : "Not Placed";
        return <Tag color={color}>{text}</Tag>;
      },
    }
  ];

  if (studentsLoading || departmentsLoading || coursesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
        <Title level={2} className="mb-8 text-center text-indigo-800">Student Management Dashboard</Title>
        
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Space size="large" className="w-full sm:w-auto flex flex-col sm:flex-row">
            <Select
              style={{ width: '100%', minWidth: 200 }}
              placeholder="Select Course"
              onChange={value => setSelectedCourse(value)}
              allowClear
            >
              {courses?.map(course => (
                <Option key={course.id} value={course.name}>{course.name}</Option>
              ))}
            </Select>
            <Select
              style={{ width: '100%', minWidth: 200 }}
              placeholder="Select Department"
              onChange={value => setSelectedDepartment(value)}
              allowClear
            >
              {departments?.map(department => (
                <Option key={department.id} value={department.name}>{department.name}</Option>
              ))}
            </Select>
          </Space>
          <Space size="large" className="w-full sm:w-auto flex flex-col sm:flex-row">
            <Input
              placeholder="Search by Enrollment"
              prefix={<SearchOutlined />}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: '100%', minWidth: 250 }}
            />
            <Button 
              type="primary" 
              icon={<UserAddOutlined />} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto"
            >
              Add New Student
            </Button>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="shadow-md"
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
}