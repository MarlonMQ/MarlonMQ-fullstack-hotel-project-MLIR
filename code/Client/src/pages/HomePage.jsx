import React, { useContext, useEffect } from 'react';
import '../index.css';

import { CarouselComponent } from '../components/Carousel';
import NavBar from '../components/NavBar';
import { Footer } from '../components/Footer';


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
import { AuthContext } from '../components/loginComponents/AuthContext'

function HomePage() {

  return (
    <>
      <NavBar/>

      {/* Es necesario que haya la misma cantidad de mobile images que desktop images */}
      <CarouselComponent images = {images}/>


      <Footer/>
    </>

  )
}

export default HomePage;
