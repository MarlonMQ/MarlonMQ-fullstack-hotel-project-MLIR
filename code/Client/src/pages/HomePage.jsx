import React, { useContext, useEffect } from 'react';
import '../index.css';

import { CarouselComponent } from '../components/Carousel';
import NavBar from '../components/NavBar';
import { Footer } from '../components/Footer';
import { AuthContext } from '../components/loginComponents/AuthContext.jsx';


const images = {
  desktopImages: ["../src/assets/hotelPictures/Hotel-image01.jpg", 
  "../src/assets/hotelPictures/Hotel-image02.jpg",
  "../src/assets/hotelPictures/Hotel-image03.jpg"
  ],
  mobileImages: ["../src/assets/hotelPictures/Hotel-image04.jpg", 
  "../src/assets/hotelPictures/Hotel-image06.jpg",
  "../src/assets/hotelPictures/Hotel-image07.jpg"
  ],
}

function HomePage() {

  const { token,logout } = useContext(AuthContext);

  return (
    <>
      <NavBar/>

      {/* Es necesario que haya la misma cantidad de mobile images que desktop images */}
      <CarouselComponent images = {images}/>
      <button onClick={logout}>Logout</button>


      <Footer/>
    </>

  )
}

export default HomePage;
