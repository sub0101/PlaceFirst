import React, { useEffect } from 'react'
import { getUserInfo, isLoggedIn } from '../utils/auth/getUserInfo'
import S_DashBoard from './Student/S_DashBoard';
import AdminPage from './Admin/AdminPage';

function Home() {
  const user = getUserInfo();
  useEffect(()=>{
    console.log(user)
  },[user])
  return  user.role =='Admin'?<AdminPage/> : <S_DashBoard/> 
}

export default Home