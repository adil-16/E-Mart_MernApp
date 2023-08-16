import React from 'react';
import Signup from "../components/Signup";

const SignupPage = () => {
  return (
    <div className="container mt-5">
       <h2 className="text-center mb-4" style={{ marginBottom: '20px', color:"blue" }}>
         Register Now!!
      </h2>
      <Signup />
    </div>
  );
};

export default SignupPage;
