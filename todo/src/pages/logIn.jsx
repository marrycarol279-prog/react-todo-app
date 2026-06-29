import React from 'react'
import { Link,Outlet } from 'react-router-dom'

function login() {
  return (
    <div>
      
      <Link to="/"> Home </Link>
      <Link to="/signUp"> Sign Up </Link>
      <Link to="/login"> Login </Link>
      
      <h3>
        Login-In
      </h3>

      <p>E-mail</p>
      <input type="text" />

      <p>Password</p>
      <input type="text" />
      <br /><br />
      <button>Log-In</button>
    </div>
  )
}

export default login
