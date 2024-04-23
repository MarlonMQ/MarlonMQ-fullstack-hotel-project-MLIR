import React from 'react';
import '../index.css';

import { CarouselComponent } from '../components/Carousel';
import NavBar from '../components/NavBar';
import { Footer } from '../components/Footer';




function HomePage() {

  return (
    <>
      <NavBar/>
      <CarouselComponent/>


      <Footer/>
    </>

  )
}

export default HomePage;
