import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const navigate = useNavigate();
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  function handellogin(){
    fetch(import.meta.env.VITE_API_URL + "/login",{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        "username" : username,
        "password" : password,
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.Token) {
        localStorage.setItem("Token", data.Token);
        navigate("/");
      }
      console.log(data.msg);
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
        <h1>Welcome back</h1>
        <p className="as">Log in to see your todo list.</p>

        <label htmlFor="lu1">Username</label>
        <input id="lu1" type="text" onChange={(e) => setUserName(e.target.value)}/>

        <label htmlFor="lp1">Password</label>
        <input id="lp1" type="password" onChange={(e) => setPassword(e.target.value)}/>

        <button className="ab" onClick={() => handellogin()}>Log in</button>
      </main>
    </div>
  )
}
export default Login
