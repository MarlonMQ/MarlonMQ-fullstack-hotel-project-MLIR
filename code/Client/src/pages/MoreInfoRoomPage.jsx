import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../services/Axios';

const getRoom = async (id) => {
    const response = await Axios.get(`/rooms/moreInfo/${id}`);
    return response.data;
}

const MoreInfoRoomPage = () => {
    const [roomData, setRoomData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const data = await getRoom(id);
                setRoomData(data[0]);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };
        fetchRoomData();
    }, [id]);

    const {
        quantity_available,
        id_room,
        room_type,
        price_per_night,
        capacity,
        description,
        image_url
    } = roomData;

    return (
        <>
            <div className='roomInfo'>
                <img src={image_url} alt="room image"  />
                <p> {description} </p>
                <button>Reserve</button>
            </div>


            {/* {
                roomData.map( (room) => {
                    return 
                } )
            } */}
        </>
    );
}

export default MoreInfoRoomPage;
