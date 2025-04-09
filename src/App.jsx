import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './home/Home'
import SignupPage from './Auth/signup'
import LoginPage from './Auth/signin'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/sign-up" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
