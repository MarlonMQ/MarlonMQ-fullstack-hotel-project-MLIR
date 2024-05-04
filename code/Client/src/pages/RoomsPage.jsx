import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RoomCard } from '../components/RoomCard';
import NavBar from '../components/NavBar';
import { CarouselComponent } from '../components/Carousel';
import { Footer } from '../components/Footer';


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
const RoomsPage = () => {

    const [dataRooms, setDataRooms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/rooms/getQuantityAvailable')
            .then(response => {
                setDataRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching services - Room Page', error);
            });
    }, []);
    console.log(dataRooms);
  return (
    <>
        <NavBar/>
        <CarouselComponent images = {images}/>

        <h1 className='secondary-title text-center mt-12'>ROOM TYPES</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            {
                dataRooms.map( (room) => {
                    return <RoomCard key={room.id_room} data={room}/>
                })
            }
        </div>
        <Footer/>
    </>
  )
}

export default RoomsPage;