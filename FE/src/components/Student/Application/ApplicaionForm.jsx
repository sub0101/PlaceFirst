import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Switch, Select, Upload, message } from 'antd';
import { motion } from 'framer-motion';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { applyCompany } from '../../../react query/api/application';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '../../../utils/auth/getUserInfo';
const { Option } = Select;

export default function ApplicationForm() {
  const companyid = useParams()
  const { control, handleSubmit, watch, setValue } = useForm();
  const [showCGPA, setShowCGPA] = useState(true);
  const {id:studentId}  = getUserInfo()
  const navigate  =useNavigate()

const applicationMutation = useMutation({
  mutationFn:applyCompany,
  mutationKey:"application",
  onSuccess:(data)=>{ 
    message.success("Succcesflly applied " , 2)
    // navigate("/")

  },
  onError:(err)=>{
    console.log()
   message.error( err.response.data.message)
  }
})
  const watchBacklog = watch('backlog', false);

  const onSubmit = (data) => {
    // console.log('Success:', data);
    data.studentId = studentId
    data.companyId = companyid.id
    applicationMutation.mutate(data)
  };

  const toggleGradeType = () => {
    setShowCGPA(!showCGPA);
    setValue('cgpa', null);
    setValue('percentage', null);
  };
console.log(companyid)
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
      >
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Company Application</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Information</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Please input your name!' }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} className="mt-1" />
                    {error && <span className="text-red-500 text-xs">{error.message}</span>}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
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
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} className="mt-1" />
                    {error && <span className="text-red-500 text-xs">{error.message}</span>}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Student ID</label>
              <Controller
                name="studentId"
                control={control}
                rules={{ required: 'Please input your student ID!' }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} className="mt-1" />
                    {error && <span className="text-red-500 text-xs">{error.message}</span>}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <Controller
                name="contact"
                control={control}
                rules={{ required: 'Please input your contact number!' }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input {...field} className="mt-1" />
                    {error && <span className="text-red-500 text-xs">{error.message}</span>}
                  </>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Branch</label>
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full mt-1" placeholder="Select your branch">
                    <Option value="computer_science">Computer Science</Option>
                    <Option value="electrical">Electrical Engineering</Option>
                    <Option value="mechanical">Mechanical Engineering</Option>
                  </Select>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Course</label>
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full mt-1" placeholder="Select your course">
                    <Option value="btech">B.Tech</Option>
                    <Option value="mtech">M.Tech</Option>
                    <Option value="phd">Ph.D</Option>
                  </Select>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full mt-1" placeholder="Select your department">
                    <Option value="engineering">Engineering</Option>
                    <Option value="science">Science</Option>
                    <Option value="management">Management</Option>
                  </Select>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Do you have any backlogs?</label>
              <Controller
                name="backlog"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Switch checked={value} onChange={onChange} />
                )}
              />
            </div>

            <div className="mb-4">
              <span className="mr-2">CGPA</span>
              <Switch checked={showCGPA} onChange={toggleGradeType} />
              <span className="ml-2">Percentage</span>
            </div>

            {showCGPA ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">CGPA</label>
                <Controller
                  name="cgpa"
                  control={control}
                  rules={{ required: 'Please input your CGPA!' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input {...field} type="number" step="0.01" min="0" max="10" className="mt-1" />
                      {error && <span className="text-red-500 text-xs">{error.message}</span>}
                    </>
                  )}
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Percentage</label>
                <Controller
                  name="percentage"
                  control={control}
                  rules={{ required: 'Please input your percentage!' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input {...field} type="number" step="0.01" min="0" max="100" className="mt-1" />
                      {error && <span className="text-red-500 text-xs">{error.message}</span>}
                    </>
                  )}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Resume</label>
              <Controller
                name="resumeUrl"
                control={control}
                render={({ field: { onChange } }) => (
                  <Upload
                    name="resume"
                    action="/upload.do"
                    listType="text"
                    onChange={(info) => {
                      if (info.file.status === 'done') {
                        onChange(info.file.response.url);
                        message.success(`${info.file.name} file uploaded successfully`);
                      } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                )}
              />
            </div>

            <Button type="primary" htmlType="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}