import React from 'react'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Facilities from './pages/Facilities'
function App() {


  return (
    <Router>
    <div className = "bg-gray-200 min-h-screen ">
      <Routes>
        <Route path = "/" element = {< HomePage/>} />
        <Route path = "/Facilities" element = {< Facilities/>} /> 

      </Routes>
  </div>

  </Router>

  )

}

export default App
