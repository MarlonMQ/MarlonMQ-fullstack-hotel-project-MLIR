import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RoomCard } from '../components/Rooms/RoomCard';


const RoomsPage = () => {    


    const [dataRooms, setDataRooms] = useState([]);

    

    useEffect(() => {
        const fetchServices = () => {
            axios.get('http://localhost:4000/rooms/getDataRooms')
                .then(response => {
                    setDataRooms(response.data);
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

        <h1 className='secondary-title text-center mt-12'>ROOM TYPES</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            {
                dataRooms.map( (room) => {
                    return <RoomCard key={room.id_room} data={room}/>
                })
            }
        </div>

    </>
  )
}

export default RoomsPage;