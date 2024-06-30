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

function App() {
  const images = {
    desktopImages: [
      "../src/assets/hotelPictures/Hotel-image01.jpg", 
      "../src/assets/hotelPictures/Hotel-image02.jpg",
      "../src/assets/hotelPictures/Hotel-image03.jpg"
    ],
    mobileImages: [
      "../src/assets/hotelPictures/Hotel-image04.jpg", 
      "../src/assets/hotelPictures/Hotel-image06.jpg",
      "../src/assets/hotelPictures/Hotel-image07.jpg"
    ],
  };

  return (
    <Router>
      <AuthProvider>
        
        <NavBar />
        <CarouselComponent images={images} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/moreInfo/:room_id" element={<MoreInfoRoomPage/>} ></Route>
          <Route path="/rooms/SelectDateReserve/:room_id/:room_number" element={<SelectDateReserve/>} ></Route>
          
          <Route path="/rooms/myreservations" element={<MyReservations/>} ></Route>
          {/* <Route path="/rooms/myreservations/:id" element={<MyReservations/>} ></Route> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
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

