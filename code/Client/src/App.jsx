import React from 'react'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Facilities from './pages/Facilities'
import Reservations from './pages/Reservations'
function App() {


  return (
    <Router>
    <div className = "bg-gray-200 min-h-screen ">
      <Routes>
        <Route path = "/" element = {< HomePage/>} />
        <Route path = "/Facilities" element = {< Facilities/>} /> 
        <Route path = "/Reservations" element = {< Reservations/>} />

      </Routes>
  </div>

  </Router>

  )

}

export default App
