import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

async function readResponseData(response) {
  const text = await response.text()

  if (!text) {
    return {}
  }

  try {
    return JSON.parse(text)
  } catch {
    return { message: text }
  }
}

function Login() {
  const navigate = useNavigate();
  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");

  async function handellogin(){
    if (!username.trim() || !password.trim()) {
      alert('Please enter username and password.')
      return
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          "username" : username,
          "password" : password,
        })
      })

      const data = await readResponseData(response)
      const token = data.token || data.Token

      if (!response.ok) {
        alert(data.message || data.msg || 'Invalid username or password')
        return
      }

      if (!token) {
        alert(data.message || data.msg || 'Login failed. Please try again.')
        return
      }

      localStorage.setItem("Token", token)
      navigate("/")
    } catch (error) {
      console.error(error)
      alert('Login failed. Please try again.')
    }
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
