import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth/getUserInfo';

export const ProtectedLogin = ({ children }) => {
  if (isLoggedIn()) {
    return <Navigate to="/" replace />; // Redirect to dashboard or home
  }
  return children; // Otherwise, render the login page
};

