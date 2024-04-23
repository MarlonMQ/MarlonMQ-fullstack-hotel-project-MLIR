import React from 'react'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {

  return (
    <Router>
      {/* Aquí va la navbar */}
      <Routes>
        <Route path="/Home" element={<HomePage/>}/>
        <Route path="/SignUp" element={<SignUpPage/>}/>

        {/* ruta register */}
        {/* ruta login */}
        {/* ruta las demas */}

      </Routes>
    </Router>
  )

}

export default App
