import React, {  useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './dash.css';
function Dashboard() {
    const navigate=useNavigate();
    const {id}=useParams();
    const [st,setSt]=useState({
      name:"",
      rollno:"",
      phoneno:null,
      address:"",
      branch:"",
      year:null,
      college:"",
      _id:""
    })

    if(!id)
    navigate('/login');

    useEffect(()=>{
      axios.get(`https://student-list-cvrt.onrender.com/${id}/dashboard`).then(res=>{
        setSt(res.data);
      }).catch(err=>{
        console.log(err);
      })
    },[id]);


  return (
    <div>
    
      <h2 className='dash-text'>welcome {st.name}</h2>
      <div className='box'>
        <h3>ID : {st._id}</h3>
        <h3>NAME : {st.name}</h3>
        <h3>ROLL NO:{st.rollno}</h3>
        <h3>PHONE No:{st.phoneno}</h3>
        <h3>ADDRESS :{st.address}</h3>
        <h3>BRANCH :{st.branch}</h3>
        <h3>YEAR :{st.year}</h3>
        <h3>COLLEGE :{st.college}</h3>
      </div>
    </div>
  )
}

export default Dashboard
