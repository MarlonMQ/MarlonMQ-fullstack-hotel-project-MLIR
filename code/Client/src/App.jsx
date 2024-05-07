import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthProvider from './components/loginComponents/AuthContext.jsx'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Facilities from './pages/Facilities'
import Reservations from './pages/Reservations'
import ReservesAdmin from './pages/ReservesAdmin.jsx'
import AdminPanelServices from './components//Services/AdminPanelServices.jsx'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/Login" element={<LoginPage/>}/>
          <Route path="/SignUp" element={<SignUpPage/>}/>
          <Route path = "/Facilities" element = {< Facilities/>} /> 
        <Route path = "/Reservations" element = {< Reservations/>} />
        <Route path = "/ReservesAdmin" element = {< ReservesAdmin/>} />
        <Route path = "/AdminPanelServices" element = {< AdminPanelServices/>} />

        </Routes>
      </AuthProvider>
    </Router>
  )

}

export default App
