import React from 'react'
import { Link,Outlet } from 'react-router-dom'

function login() {
  return (
    <div>
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
