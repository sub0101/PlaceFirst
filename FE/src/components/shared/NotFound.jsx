import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/auth/getUserInfo';

const NotFound= () => {
  const navigate = useNavigate();
const user = getUserInfo()
  const handleBackHome = () => {
   user.role =="Admin"? navigate('/admin'):navigate("/");
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry,Page Does Not Exist"
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
      <img 
        src="https://example.com/403-error.png" 
        alt="Access Denied" 
        style={{ marginTop: '20px', width: '100%', maxWidth: '400px' }}
      />
    </div>
  );
};

export default NotFound;
