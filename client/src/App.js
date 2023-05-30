import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Dashboard from './pages/Dashboard.js';
import { createContext, useState } from 'react';


function App() {
  const store=createContext();
  const [token,setToken] =useState(null);
  return (
    <div className="App">
      <BrowserRouter>
      <store.Provider  value={[token,setToken]}>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login}/>
        <Route exact path="/register" Component={Register}/>
        <Route exact path="/:id/dashboard" Component={Dashboard}/>
      </Routes>
      </store.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
