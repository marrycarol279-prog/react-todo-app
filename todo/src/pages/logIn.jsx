import { useState } from 'react'
import { Link } from 'react-router-dom'

function login() {
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");

  function handellogin(){
    fetch("http://localhost:5000/login",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "username" : username,
        "password" : password,
      })
    })
  }
  
  return (
    <div>
      <Link to="/"> Home </Link>
      <Link to="/signUp"> Sign Up </Link>
      <Link to="/login"> Login </Link>
      
      <h3>
        Login-In
      </h3>

      <p>Usename</p>
      <input type="text" onChange={(e) => setUserName(e.target.value)}/>

      <p>Password</p>
      <input type="text" onChange={(e) => setPassword(e.target.value)}/>

      <button onClick={() => handellogin()}>Log-In</button>
    </div>
  )
}

export default login
