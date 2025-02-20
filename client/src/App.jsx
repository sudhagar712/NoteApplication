import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './Components/Header'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
