import React, { useEffect } from 'react'
import { isLoggedIn } from '../../utils/auth/getUserInfo'
import { Outlet, useNavigate } from 'react-router-dom';
function PrivateOutlet() {
  const isLogin = isLoggedIn()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("private outlet")
        !isLogin && navigate('/login')
   
    } , [])
  return  isLogin && <Outlet />
  
}

export default PrivateOutlet