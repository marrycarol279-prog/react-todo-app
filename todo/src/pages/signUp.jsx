import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

function SignUp() {
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
        "password": password,
        "email": email
      })
    })
  }

  return (
    <div className="ap">
      <nav className="an">
        <Link to="/">Home</Link>
        <Link to="/signUp">Sign Up</Link>
        <Link to="/login">Login</Link>
      </nav>

      <main className="ac">
        <p className="ae">MY TASKS</p>
        <h1>Create an account</h1>
        <p className="as">Start keeping track of your tasks.</p>

        <label htmlFor="su1">Username</label>
        <input id="su1" type="text" onChange={(e) => setUserName(e.target.value)}/>

        <label htmlFor="se1">Email</label>
        <input id="se1" type="email" onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="sp1">Password</label>
        <input id="sp1" type="password" onChange={(e) => setPassword(e.target.value)}/>

        <button className="ab" onClick={() => handleSignUp()}>Sign up</button>
      </main>
    </div>
  )
}

export default SignUp
  