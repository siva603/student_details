import React, { useContext, useEffect } from 'react'
import store from '../App.js'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const [token,setToken]=useContext(store);
    const navigate=useNavigate();


    if(!token)
    navigate('/login');

    useEffect(()=>{
      axios.get(`/${token}/dashboard`).then(res=>{
        console.log(res.data);
      }).catch(err=>{
        console.log(err);
      })
    },[token]);


  return (
    <div>
      <h2>welcome to Dashboard </h2>
    </div>
  )
}

export default Dashboard
