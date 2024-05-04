import React from 'react'
import HomePage from './pages/HomePage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Facilities from './pages/Facilities'
import RoomsPage from './pages/RoomsPage'
function App() {


  return (
    <Router>
      <div className = "bg-gray-200 min-h-screen ">
        <Routes>
          <Route path = "/" element = {< HomePage/>} />
          <Route path = "/Facilities" element = {< Facilities/>} /> 
          <Route path='/Rooms' element = { <RoomsPage/> } />
          
        </Routes>
      </div>
  </Router>

  )

}

export default App
