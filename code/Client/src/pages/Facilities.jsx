import React from 'react';
import CardsFacilities from '../components/CardsFacilities';
import '../index.css';
import FoarmServicios from '../components/FoarmServicios';
const Facilities = () => {
    return (
        <div className='min-h-screen flex flex-col items-center'>
            <h1 className='primary-title text-black text-center'>FACILITIES</h1>
            <p className='mt-8 mb-8 px-2 primary-text max-w-4xl text-center'> We want your stay at our lush hotel to be truly unforgettable.  That is why we give special attention to all of your needs so 
            that we can ensure an experience quite uniquw. Luxury hotels offers the perfect setting with stunning views for leisure
            and our modern luxury resort facilities will help you enjoy the best of all. </p>
            <CardsFacilities image='../spa.png' title='THE SPA' />
            <FoarmServicios/>

        </div>
    );
};

export default Facilities;
