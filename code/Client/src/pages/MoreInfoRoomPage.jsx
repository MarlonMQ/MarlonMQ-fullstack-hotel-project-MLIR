import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Axios from '../services/Axios';

const getRoom = async (room_id) => {
    const response = await Axios.get(`/rooms/moreInfo/${room_id}`);
    return response.data;
}

const MoreInfoRoomPage = () => {
    const [roomData, setRoomData] = useState({});
    const { room_id } = useParams();

    
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const data = await getRoom(room_id);
                setRoomData(data[0]);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };
        fetchRoomData();
    }, [room_id]);

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
            <div className="flex flex-col items-center w-8/12 mx-auto my-5">
                <img 
                    src={image_url} 
                    alt="room image" 
                    className="mb-4 rounded-lg"
                />

                <h1 
                    className="text-3xl font-bold mb-4"
                >
                    {room_type}
                </h1>
                <p 
                    className="text-center primary-text"
                >
                    {description}
                </p>

                <Link
                    className="mt-4 px-4 py-2 bg-third text-white rounded-lg"
                    to={`/rooms/SelectDateReserve/${room_id}/${price_per_night}`}
                    onClick={() => (console.log("hola mundo"))}
                >
                    Choose a date
                </Link>

            </div>

        </>
    );
}

export default MoreInfoRoomPage;
