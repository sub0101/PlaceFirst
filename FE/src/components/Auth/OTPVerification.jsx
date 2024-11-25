import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, message } from 'antd';
import { useLocale } from 'antd/es/locale';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { register } from '../../react query/api/auth';
const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const inputRefs = useRef([]);
  const formData = useLocation().state
  console.log(formData)

  const registerMutation = useMutation({
    mutationFn: register,
    mutationKey: ["register"],
    onSuccess: () => {
      setLoading(false)
      message.success('Signup successful!')
      
      form.resetFields()
      navigate('/login')
    },

  
    onError: (error) => {
      // console.log(error)
            setLoading(false)

      // console.log(error.response.data.message)
      const err = error.response.data.message
      message.error(err || 'Signup failed. Please try again.')

    }
  })

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.target.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))]);

    if (element.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e , index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    pastedData.forEach((value, index) => {
      if (index < 6) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const verifyOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length === 6) {
        console.log(enteredOTP)
        formData.otp = enteredOTP
        registerMutation.mutate(formData)
      // Here you would typically send the OTP to your backend for verification
    //   message.success('OTP Verified Successfully!');
    } else {
      message.error('Please enter a valid 6-digit OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Verify Your OTP</h2>
        <p className="text-center mb-6 text-gray-600">Enter the 6-digit code sent to your device</p>
        <div className="flex justify-center mb-6">
          {otp.map((data, index) => (
            <Input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              onPaste={handlePaste}
              ref={(input) => (inputRefs.current[index] = input)}
              className="w-12 h-12 text-2xl text-center mx-1 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
              autoComplete="off"
            />
          ))}
        </div>
        <Button
          type="primary"
          onClick={verifyOTP}
          className="w-full h-12 text-lg font-semibold rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 transition duration-200"
        >
          Verify OTP
        </Button>
        <p className="text-center mt-4 text-gray-600">
          Didn't receive the code? <a href="#" className="text-blue-500 hover:underline">Resend OTP</a>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;