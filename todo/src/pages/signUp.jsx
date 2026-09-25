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

function SignUp() {
  const navigate = useNavigate()
  const [username,setUserName] = useState(""); 
  const [password,setPassword] = useState(""); 
  const [email,setEmail] = useState(""); 

  async function handleSignUp(){
    if (!username.trim() || !password.trim() || !email.trim()) {
      alert('Please fill in all fields.')
      return
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/signup",{
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

      const data = await readResponseData(response)
      const message = data.message || data.msg || 'Signup successful'

      if (!response.ok && message.toLowerCase() !== 'success') {
        alert(message || 'Signup failed')
        return
      }

      alert(message === 'success' ? 'Signup successful. Please log in.' : message)
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('Signup failed. Please try again.')
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
  