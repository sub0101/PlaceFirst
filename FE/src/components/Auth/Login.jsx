import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../react query/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { setUserInfo } from "../../utils/localStorage";
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';

// Import toastify css file
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors },watch } = useForm({
    mode: 'onBlur',  // Enable validation onChange
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setLoading(false);
      setUserInfo(data.token);
      message.success("Successfully logged in");
      data.role === "Admin" ? navigate("/admin") : navigate("/");
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed");
    },
  });
  const password = watch('password', '');
  const onSubmit = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
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
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden"
      >
        <div className="w-full p-8 lg:w-1/2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-blue-700 mb-6"
          >
            Welcome Back!
          </motion.h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                Student ID
              </label>
              <div className="relative">
                <UserOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("userId", { required: "Student ID is required" })}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="userId"
                  placeholder="Enter your Student ID"
                />
              </div>
              {errors.userId && <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <LockOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("password", { required: "Password is required" ,pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message:
                      'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
                  }, } )}
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <GoogleOutlined className="h-5 w-5 text-red-500 mr-2" />
                Sign in with Google
              </button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
          }}
        >
          <div className="flex items-center justify-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">Placed First</h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Login to access exclusive placement opportunities and unlock your potential. Your future career starts here!
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </div>
  );
}

export default Login;