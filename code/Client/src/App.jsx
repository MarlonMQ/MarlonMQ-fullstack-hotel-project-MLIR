import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthProvider from './components/loginComponents/AuthContext.jsx'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'



function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/SignUp" element={<SignUpPage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )

}

export default App
