import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import LoginIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<LoginIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
