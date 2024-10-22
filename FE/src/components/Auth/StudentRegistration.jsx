import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { register } from '../../react query/api/auth'

export default function StudentSignup() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const registerMutation = useMutation({
    mutationFn: register,
    mutationKey: ["register"],
    onSuccess: () => {
      setLoading(false)
      message.success('Signup successful!')
      form.resetFields()
    },
    onError: (error) => {
      // console.log(error)
            setLoading(false)

      // console.log(error.response.data.message)
      const err = error.response.data.message
      message.error(err || 'Signup failed. Please try again.')

    }
  })

  const onFinish = (values) => {
    setLoading(true)
    registerMutation.mutate(values)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/2 p-8"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-indigo-700 mb-6"
          >
            Student Signup
          </motion.h1>
          <Form
            form={form}
            name="student_signup"
            onFinish={onFinish}
            layout="vertical"
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Form.Item
                name="userId"
                rules={[{ required: true, message: 'Please input your Student ID!' }]}
              >
                <Input name='userId' prefix={<IdcardOutlined className="text-indigo-500" />} placeholder="Student ID" />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input prefix={<UserOutlined className="text-indigo-500" />} placeholder="Full Name" />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input prefix={<MailOutlined className="text-indigo-500" />} placeholder="Email" />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Form.Item
                name="contact"
                rules={[{ required: true, message: 'Please input your contact number!' }]}
              >
                <Input prefix={<PhoneOutlined className="text-indigo-500" />} placeholder="Contact Number" />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password prefix={<LockOutlined className="text-indigo-500" />} placeholder="Password" />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The two passwords do not match!'))
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined className="text-indigo-500" />} placeholder="Confirm Password" />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  loading={loading}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </motion.div>
          </Form>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-4 text-gray-600"
          >
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in here</Link>
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/2 bg-indigo-600 flex items-center justify-center p-8"
        >
          <div className="text-center">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="College logo"
              className="mx-auto mb-8 rounded-full bg-white p-2"
            />
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Placed First</h2>
            <p className="text-indigo-200 text-lg">
              Join our community and unlock your potential. Sign up now to access exclusive placement opportunities!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}