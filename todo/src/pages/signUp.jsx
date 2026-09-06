import React from 'react'
import { useState } from 'react'
import { Link,Outlet } from 'react-router-dom'

function signUp() {
  const [username,setUserName] = useState(""); 
  const [password,setPassword] = useState(""); 
  const [email,setEmail] = useState(""); 

  function handleSignUp(){
    fetch("http://localhost:5000/signup",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({ 
        "username": username, 
        "password": password 
      })
    })
  }

  return (
    <div>
      
      <Link to="/"> Home </Link>
      <Link to="/signUp"> Sign Up </Link>
      <Link to="/login"> Login </Link>

      <h2>SignUp</h2>
      <p>Username</p>
      <input type="text" onChange={(e) => setUserName(e.target.value)}/>
      <p>E-mail</p>
      <input type="text" onChange={(e) => setEmail(e.target.value)}/>
      <p>Password</p>
      <input type="text" onChange={(e) => setPassword(e.target.value)}/> <br />
      <button onClick={() => handleSignUp()}>Sign Up !!</button>
    </div>
  )
}

export default signUp
  