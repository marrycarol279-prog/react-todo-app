import React from 'react'
import { Link,Links,Outlet } from 'react-router-dom'
const signUp = () => {
  return (
    <div >
      <Link to="/"> Home </Link>
      <h2>SignUp</h2>
      <p>Name</p>
      <input type="text" />
      <p>Phone Number</p>
      <input type="text" />
      <p>E-mail</p>
      <input type="text" />
      <p>Password</p>
      <input type="text"/> <br />
      <button>Sign Up !!</button>
    </div>
  )
}

export default signUp
