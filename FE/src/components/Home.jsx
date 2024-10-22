import React, { useEffect } from 'react'
import { getUserInfo, isLoggedIn } from '../utils/auth/getUserInfo'

import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import NotFound from './shared/NotFound';

function Home({requiredRole}) {
  const user = getUserInfo();
  const isAdmin = user.role=="Admin"?true:false;
  console.log(requiredRole + " "+user.role)
  if(requiredRole!=user.role) return <NotFound /> 

  return <Outlet/> 
 
  

  
}

export default Home