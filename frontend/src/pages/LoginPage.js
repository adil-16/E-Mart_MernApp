import React from 'react';
import Login from '../components/Login';

const LoginPage = ({setIsLoggedIn,isLoggedIn}) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ marginBottom: '20px', color:"red" }}>Welcome To E-Mart!!</h2>
      <h2 className="text-center mb-4" style={{ marginBottom: '20px', color:"blue" }}>
        Login Page
      </h2>
      <Login setIsLoggedIn={setIsLoggedIn}  isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default LoginPage;
