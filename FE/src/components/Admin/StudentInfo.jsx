'use client'

import React from 'react'
import { Card, Descriptions, Table, Tag, Typography, Spin, Empty } from 'antd'
import { UserOutlined, BookOutlined, BankOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getStudentInfo } from '../../react query/api/profile'

const { Title } = Typography

export default function StudentInfo() {
  const { id: studentId } = useParams()
  
  const { data: studentInfo, isError, isLoading } = useQuery({
    queryFn: () => getStudentInfo(studentId),
    queryKey: ['studentInfo', studentId]
  })

  const educationColumns = [
    { title: 'Degree', dataIndex: 'degree', key: 'degree' },
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Institution', dataIndex: 'institution', key: 'institution' },
    { 
      title: 'Current', 
      dataIndex: 'currentEducation', 
      key: 'currentEducation',
      render: (current) => current ? <Tag color="green">Current</Tag> : <Tag color="default">Past</Tag>
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spin size="large" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Empty
          description="Error loading student information"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    )
  }

  if (!studentInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Empty description="No student information found" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <Title level={2} className="mb-8 text-center">Student Profile</Title>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information Card */}
        <Card className="col-span-1 lg:col-span-2 shadow-md">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src={studentInfo.image || "/placeholder.svg?height=150&width=150"} 
                alt={studentInfo.name || "Profile"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <Title level={3}>{studentInfo.name}</Title>
              <p className="text-gray-600">{studentInfo.studentId}</p>
              <p className="text-gray-600">{studentInfo.email}</p>
              <p className="text-gray-600">{studentInfo.contact || 'No contact provided'}</p>
            </div>
          </div>
          
          <Descriptions 
            title="Personal Information" 
            bordered 
            column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
            className="[&_td]:break-words"
          >
            <Descriptions.Item label="Branch">{studentInfo.branch || 'Not specified'}</Descriptions.Item>
            <Descriptions.Item label="Course">{studentInfo.course?.name || 'Not specified'}</Descriptions.Item>
            <Descriptions.Item label="Department">{studentInfo.department?.name || 'Not specified'}</Descriptions.Item>
            <Descriptions.Item label="Status">
              {studentInfo.status ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="Debarred">
              {studentInfo.debarred ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="Backlog">
              {studentInfo.backlog ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>}
            </Descriptions.Item>
            <Descriptions.Item label="CGPA">{studentInfo.cgpa || 'Not available'}</Descriptions.Item>
            <Descriptions.Item label="Percentage">{studentInfo.percentage ? `${studentInfo.percentage}%` : 'Not available'}</Descriptions.Item>
            {studentInfo.resumeUrl && (
              <Descriptions.Item label="Resume" span={2}>
                <a 
                  href={studentInfo.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  View Resume
                </a>
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Applied At" span={2}>
              {studentInfo.appliedAt ? new Date(studentInfo.appliedAt).toLocaleString() : 'Not available'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        
        {/* Placement Information Card */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <BankOutlined />
              <span>Placement Information</span>
            </div>
          } 
          className="col-span-1 shadow-md h-fit"
        >
          {studentInfo.placement ? (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Company">{studentInfo.placement.company}</Descriptions.Item>
              <Descriptions.Item label="CTC">{studentInfo.placement.ctc}</Descriptions.Item>
              <Descriptions.Item label="Tier">{studentInfo.placement.tier}</Descriptions.Item>
            </Descriptions>
          ) : (
            <Empty 
              description="Not yet placed"
              className="my-4"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </Card>
      </div>
      
      {/* Education History Card */}
      <Card 
        title={
          <div className="flex items-center gap-2">
            <BookOutlined />
            <span>Education History</span>
          </div>
        }
        className="mt-8 shadow-md"
      >
        {studentInfo.education && studentInfo.education.length > 0 ? (
          <Table 
            dataSource={studentInfo.education} 
            columns={educationColumns} 
            pagination={false}
            rowKey="id"
            scroll={{ x: true }}
            className="[&_.ant-table-cell]:break-words"
          />
        ) : (
          <Empty description="No education history available" />
        )}
      </Card>
    </div>
  )
}