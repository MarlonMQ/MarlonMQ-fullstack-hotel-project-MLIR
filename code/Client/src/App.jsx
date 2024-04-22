import React from 'react'
import HomePage from './pages/HomePage'
import Facilities from './pages/Facilities'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {

  return (
    <Router>
      {/* Aquí va la navbar */}
      <Routes>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/Facilities" element={<Facilities/>}/>

        {/* ruta register */}
        {/* ruta login */}
        {/* ruta las demas */}

      </Routes>
    </Router>
  )

}

export default App
