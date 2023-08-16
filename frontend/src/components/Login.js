import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';


const Login = ({isLoggedIn,setIsLoggedIn  }) => {
  const navigate = useNavigate();
  const{setUsername}= useCartContext();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isChecked: false,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null); // Reset error state
      const response = await axios.post('http://localhost:5000/users/login', formData);
      console.log("Response data: ", response.data);

      // Show success toast notification
     
      setUsername(response.data?.user?.username);
      toast.success("Login successful!");
      
      setIsLoggedIn(true); // Set the logged in status
      console.log(isLoggedIn);
      
      navigate('/products');
      
    } catch (error) {
      console.error("Error during user login: ", error.response?.data);
      setError(error.response?.data?.message || "Unknown error occurred");
      
      // Show error toast notification
      toast.error("Error during login");
    }
  };


  return (
    <div className="container d-flex justify-content-center align-items-center  ">

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary w-100 mt-3 mb-3">Submit</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
};


export default Login