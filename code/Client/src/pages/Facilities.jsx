import React from 'react';

import '../index.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardsFacilities from '../components/Services/CardsFacilities';
import { toast } from 'react-toastify';

const Facilities = () => {
    const admin = true;
    const [services, setServices] = useState([]);
    
    useEffect(() => {
        const fetchServices = () => {
            axios.get('http://localhost:4000/services/all')
                .then(response => {
                    setServices(response.data);
                })
                .catch(error => {
                    toast.error('Error fetching services');
                    console.error('Error fetching services', error);
                });
        };
    
        fetchServices(); // initial fetch
        const interval = setInterval(fetchServices, 10000); // refresh every 10 seconds
    
        return () => clearInterval(interval); // clear the interval
    }, []);
    
    return (
        <>
            <div className='min-h-screen flex flex-col items-center mt-12'>
                <h1 className='primary-title text-black text-center mt-10'>FACILITIES</h1>
                <p className='mt-8 mb-8 px-2 primary-text max-w-4xl text-center'> 
                    We want your stay at our lush hotel to be truly unforgettable. That is why we give special attention to all of your needs so 
                    that we can ensure a unique experience. Luxury hotels offer the perfect setting with stunning views for leisure
                    and our modern luxury resort facilities will help you enjoy the best of all. 
                </p>
                {services.map(service => (
                    <CardsFacilities key={service.imageUrl} title={service.title} image={service.imageUrl} setServices={setServices} services={services}/>
                ))}
            </div>
        </>
    );
};

export default Facilities;
