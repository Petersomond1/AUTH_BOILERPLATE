import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/Signup'
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      
    </BrowserRouter>  
  )
}

export default App
