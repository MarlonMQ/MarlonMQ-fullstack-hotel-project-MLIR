// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './components/loginComponents/AuthContext.jsx';
import NavBar from './components/NavBar.jsx';
import { CarouselComponent } from './components/Carousel.jsx';
import { Footer } from './components/Footer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Facilities from './pages/Facilities';
import RoomsPage from './pages/RoomsPage';
import DashboardLayout from './LayOut/DashboardLayout.jsx';
import ProtectedRoute from './components/loginComponents/ProtectedRoute.jsx';
import MoreInfoRoomPage from './pages/MoreInfoRoomPage.jsx';
import MyReservations from './pages/MyReservations.jsx';
import SelectDateReserve from './pages/SelectDateReserve.jsx';
import PaymentForm from './components/PaymentMethod/PaymentForm.jsx';
import MyAccount from './pages/MyAccount.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import PayReserves from './components/PaymentMethod/PayReserves.jsx';
import CardList from './components/PaymentMethod/ListCards.jsx';
import EditCard from './components/PaymentMethod/EditCard.jsx';
import ChangeData from './components/PaymentMethod/ChangeData.jsx';
import { UpdateReservePage } from './pages/UpdateReservePage.jsx';

function App() {
  

  return (
    <Router>
      <AuthProvider>
        
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cardsAdd" element={<PaymentForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ChangePassword />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/cards" element={<CardList />} />
          <Route path="/CardDetails/:cardId" element={<EditCard />} />
          <Route path="/rooms/moreInfo/:room_id" element={<MoreInfoRoomPage/>} ></Route>
          <Route path="/rooms/SelectDateReserve/:room_id/:price" element={<SelectDateReserve/>} ></Route>
          <Route path='/modifyReservation/:reserveId/:avId' element = { <UpdateReservePage/> }/>
          <Route path="/rooms/myreservations" element={<MyReservations/>} ></Route>
          <Route path="/paymentReserve/:reservationId/:total/:checkIn/:checkOut/:id_services/:num_room" element={<PayReserves />} />
          <Route path="/edit-card/:cardId" element={<ChangeData />} />
          {/* <Route path="/rooms/myreservations/:id" element={<MyReservations/>} ></Route> */}
          <Route element={<ProtectedRoute requiredROle = "admin" />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route path="/MyAccount" element={<MyAccount />} />
          </Route>
        </Routes>
        <Footer />
        <ToastContainer 
          position="bottom-right"
          hideProgressBar
          newestOnTop
          theme="colored"
        />
      </AuthProvider>
    </Router>
  );
}

export default App;

