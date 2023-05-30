import React, { useContext, useState } from 'react';
import Header from '../components/Header.js';
import './login.css'
import store from '../App.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [student,setStudent]=useState({
    rollno:"",
    password:""
  });
  const [token ,setToken]=useContext(store);
  const navigate=useNavigate()

  const handleChange=(e)=>{
    setStudent({...student,[e.target.name]:e.target.value});
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!student.password|| !student.rollno)
    alert("Please fill all fields");
    axios.post('/login',student).then(res=>{
      alert(res.data);
      setToken(res.data);
    }).catch(err=>{
      console.log(err);
    })
    navigate(`/${token}/dashboard`);
  }
  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit}>
        <input type='text' name='rollno' value={student.rollno} placeholder='ROLL NO' onChange={handleChange}/>
        <input type='password' name='password' value={student.password} placeholder='PASSWORD' onChange={handleChange}/>
        <input type='submit' value="Login"/>
      </form>
    </div>
  )
}

export default Login
