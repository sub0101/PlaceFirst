import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Typography, Space } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

// Mock data
const students = [
  { id: 1, name: 'John Doe', enrollment: 'A001', course: 'Computer Science', branch: 'AI', email: 'john@example.com', contact: '1234567890' },
  { id: 2, name: 'Jane Smith', enrollment: 'B002', course: 'Electrical Engineering', branch: 'Power Systems', email: 'jane@example.com', contact: '9876543210' },
  // Add more student data here...
];

const courses = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];
const branches = ['AI', 'Power Systems', 'Robotics'];

function ManageUsers() {
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  useEffect(() => {
    const filtered = students.filter(student => 
      (selectedCourse ? student.course === selectedCourse : true) &&
      (selectedBranch ? student.branch === selectedBranch : true) &&
      (searchText ? student.enrollment.toLowerCase().includes(searchText.toLowerCase()) : true)
    );
    setFilteredStudents(filtered);
  }, [searchText, selectedCourse, selectedBranch]);

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
    { title: 'Enrollment', dataIndex: 'enrollment', key: 'enrollment' },
    { title: 'Course', dataIndex: 'course', key: 'course' },
    { title: 'Branch', dataIndex: 'branch', key: 'branch' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Contact', dataIndex: 'contact', key: 'contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <Title level={2} className="mb-8 text-center text-indigo-800">Student Management Dashboard</Title>
        
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Space size="large" className="flex-grow">
            <Select
              style={{ width: 200 }}
              placeholder="Select Course"
              onChange={value => setSelectedCourse(value)}
              allowClear
            >
              {courses.map(course => (
                <Option key={course} value={course}>{course}</Option>
              ))}
            </Select>
            <Select
              style={{ width: 200 }}
              placeholder="Select Branch"
              onChange={value => setSelectedBranch(value)}
              allowClear
            >
              {branches.map(branch => (
                <Option key={branch} value={branch}>{branch}</Option>
              ))}
            </Select>
          </Space>
          <Space size="large" className="flex-grow">
            <Input
              placeholder="Search by Enrollment"
              prefix={<SearchOutlined />}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Button type="primary" icon={<UserOutlined />} className="bg-indigo-600 hover:bg-indigo-700">
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
        />
      </div>
    </div>
  );
}
export default ManageUsers