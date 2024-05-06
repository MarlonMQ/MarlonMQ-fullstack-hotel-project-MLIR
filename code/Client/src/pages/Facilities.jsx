import React from 'react';
import CardsFacilities from '../components/Services/CardsFacilities';
import '../index.css';
import UploadServiceForm from '../components/Services/FoamFacilities';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import NavBar from '../components/NavBar';
import { CarouselComponent } from '../components/Carousel';

// Las imagenes deberian ser distintas para cada page, al menos las desktop.
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


const Facilities = () => {
    const [services, setServices] = useState([]);
    
        useEffect(() => {
            const fetchServices = () => {
                axios.get('http://localhost:4000/services/all')
                    .then(response => {
                        setServices(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching services', error);
                    });
            };
    
            fetchServices(); // Fetch immediately on component mount
            const interval = setInterval(fetchServices, 10000); // Refresh every 10 seconds
    
            return () => clearInterval(interval); // Clean up interval on component unmount
        }, []);
    return (
    <>
        <NavBar/>
        <CarouselComponent images = {images}/>

        <div className='min-h-screen flex flex-col items-center mt-12'>
            <h1 className='primary-title text-black text-center'>FACILITIES</h1>
            <p className='mt-8 mb-8 px-2 primary-text max-w-4xl text-center'> 
                We want your stay at our lush hotel to be truly unforgettable.  That is why we give special attention to all of your needs so 
                that we can ensure an experience quite uniquw. Luxury hotels offers the perfect setting with stunning views for leisure
                and our modern luxury resort facilities will help you enjoy the best of all. 
            </p>
            {services.map(service => (
                    <CardsFacilities key={service.imageUrl} title={service.title} image={service.imageUrl} setServices = {setServices} services = {services}/>
                ))}
            <UploadServiceForm/>

        </div>

        <Footer/>
    </>

    );
};

export default Facilities;
