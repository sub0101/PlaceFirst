import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { QueryClient ,QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider >
    <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer  autoClose={1000}/>

    </QueryClientProvider>
    </AuthProvider>
  
  </StrictMode>,
)
