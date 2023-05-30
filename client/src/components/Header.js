import React ,{useEffect,useState} from 'react';
import { Link,useLocation } from 'react-router-dom';
import './header.css'

function Header() {
    const [activeTab,setActiveTab] =useState(null);
    const location=useLocation();
    useEffect(()=>{
      if(location.pathname==='/')
    setActiveTab("Home");
    else if(location.pathname==="/login")
    setActiveTab("Login");
    else if(location.pathname==="/register")
    setActiveTab("Register")
    },[location]);

  return (
    <div>
      <ol>
      <Link to='/'>
            <li className={`${activeTab === "Home" ? "active" : "" }`} onClick={()=>setActiveTab("Home")}> Home</li>
            </Link>
            <Link to='/login'>
            <li className={`${activeTab === "Login" ? "active" : "" }` } onClick={()=>setActiveTab("Login")}>Login</li>
            </Link>     
            <Link to='/register'>
            <li className={`${activeTab === "Register" ? "active" : "" }`} onClick={()=>setActiveTab("Register")}>Register</li>
            </Link>
      </ol>
    </div>

  )
}
export default Header