import React, { useState } from 'react'
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate=useNavigate()
  const [stu,setStu]=useState({
    name:"",
    rollno:"",
    phoneno:null,
    address:"",
    branch:"",
    year:null,
    college:""
  })

  const handleChange=(e)=>{
    setStu({...stu,[e.target.name]:e.target.value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!stu.name|| !stu.rollno||!stu.phoneno||!stu.address||!stu.branch||!stu.year||!stu.college)
    alert("Please fill all fields");
    axios.post('/register',stu).then(res=>{
      alert(res.data);
    }).catch(err=>{
      console.log(err);
    })
    navigate('/loginss');
  }

  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit}>
        <input type='text' value={stu.name} placeholder='NAME' name='name'  onChange={handleChange}/>
        <input type='text' value={stu.rollno} placeholder='ROLL NO' name='rollno' onChange={handleChange}/>
        <input type='number' value={stu.phoneno} placeholder='PHONE NO' name='phoneno'onChange={handleChange}/>
        <input  type='text' value={stu.address} placeholder='ADDRESS' name='address' onChange={handleChange}/>
        <input type='text' value={stu.branch} placeholder='BRANCH' name='branch' onChange={handleChange}/>
        <input type='number' value={stu.year} placeholder='YEAR' name='year' onChange={handleChange}/>
        <input type='text' value={stu.college} placeholder='COLLEGE' name='college' onChange={handleChange}/>
        <input type='submit' value="Register" />
      </form>
    </div>
  )
}

export default Register
