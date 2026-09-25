import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import LoginIn from './pages/logIn'

import SignUp from './pages/signUp'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<LoginIn />} />
      </Routes>
    </div>
  )
}

export default App