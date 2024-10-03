
import { createContext, useContext, useState } from 'react';
import { isLoggedIn } from '../utils/auth/getUserInfo';

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(isLoggedIn())

  // Method to update login status globally (e.g., after login/logout)
  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  const value = { isLogin, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
