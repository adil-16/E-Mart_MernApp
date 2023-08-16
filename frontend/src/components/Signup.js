import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        isChecked: false,
    });
  const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users/add', formData);
            console.log("User registration successful: ", response.data);
            toast.success("User registration successful!");
            setFormData({
                username: "",
                email: "",
                password: "",
                isChecked: false,
            });
            navigate('/login');

        } catch (error) {
            console.error("Error during user registration: ", error.response.data);
            toast.error("Error during user registration!");

        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center  ">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInput" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInput"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
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
                    
                    <button type="submit" className="btn btn-outline-primary w-100 mt-4 mb-4">Register</button>
                </form>
            </div>
        

    );
};

export default Signup;