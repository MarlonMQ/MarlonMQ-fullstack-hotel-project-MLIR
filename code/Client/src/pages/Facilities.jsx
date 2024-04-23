import React from 'react';
import CardsFacilities from '../components/CardsFacilities';
import '../index.css';
import FormServicios from '../components/FormServicios';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
        <div className='min-h-screen flex flex-col items-center'>
            <h1 className='primary-title text-black text-center'>FACILITIES</h1>
            <p className='mt-8 mb-8 px-2 primary-text max-w-4xl text-center'> We want your stay at our lush hotel to be truly unforgettable.  That is why we give special attention to all of your needs so 
            that we can ensure an experience quite uniquw. Luxury hotels offers the perfect setting with stunning views for leisure
            and our modern luxury resort facilities will help you enjoy the best of all. </p>
            {services.map(service => (
                    <CardsFacilities key={service.imageUrl} title={service.title} image={service.imageUrl} />
                ))}
            <FormServicios/>

        </div>
    );
};

export default Facilities;
