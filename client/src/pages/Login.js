import React, { useState } from 'react';
import Header from '../components/Header.js';
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let [student,setStudent]=useState({
    rollno:"",
    password:""
  });
  const navigate=useNavigate()

  const handleSubmit=async (e)=>{
    e.preventDefault();
    let token="";
    if(!student.password|| !student.rollno)
    alert("Please fill all fields");
    if(student.password&&student.rollno){
    await axios.post('https://student-list-cvrt.onrender.com/login',student).then(res=>{
       token=res.data;
    }).catch(err=>{
      console.log(err)
    })
  }
    if(token){
    navigate(`/${token}/dashboard`);
    }
    if(!token){
      navigate('/login');
    }
   
  }

  const handleChange=(e)=>{
    setStudent({...student,[e.target.name]:e.target.value});
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
