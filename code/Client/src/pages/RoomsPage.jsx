import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RoomCard } from '../components/RoomCard';



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
        <div className="grid grid-cols-3 gap-4 p-4">
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