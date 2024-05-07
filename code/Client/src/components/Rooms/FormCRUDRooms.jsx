import React, { useState, useEffect,useContext } from "react";
import axios from 'axios';
import { DeleteConfirmation } from '../Services/FacilitiesUtils';
import FormRooms from "./FormRooms";
import { AuthContext } from '../loginComponents/AuthContext.jsx';

function FormCRUDRooms() {

    const [rooms, setRooms] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    // Guarda el que voy a borrar
    const [roomToDelete, setRoomToDelete] = useState(null);

    const { token } = useContext(AuthContext);


    useEffect(() => {
        const fetchServices = () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('http://localhost:4000/rooms/getDataRooms')
                .then(response => {
                    setRooms(response.data);
                })
                .catch(error => {
                    console.error('Error fetching services', error);
                });
        };

        fetchServices(); // Fetch immediately on component mount
        const interval = setInterval(fetchServices, 10000); // Refresh every 10 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);



    const initiateDeleteRoom = (service) => {
        setRoomToDelete(service);
        setShowConfirmation(true);
    };

    const deleteRoom = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`http://localhost:4000/rooms/?url=${roomToDelete.image_url}`)
            .then(() => {
                setRooms(rooms.filter(s => s.id_room !== roomToDelete.id_room));
                setShowConfirmation(false);
            })
            .catch(error => {
                console.error('Error deleting service', error);
            });
    };
    return (
        <div className="container mx-auto mt-10 border-l border-r border-gray-300">
            <FormRooms />
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Image URL
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Image
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms.map(room => (
                            <tr key={room.id_room}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {room.room_type}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {room.image_url}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <img src={room.image_url} alt={room.type} className="w-10 h-10 rounded"/>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button
                                        onClick={() => initiateDeleteRoom(room)}
                                        className="text-red-500 hover:text-red-700">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            )
                        )
                    }
                </tbody>
            </table>
            {showConfirmation && (
                <DeleteConfirmation
                    show={showConfirmation}
                    onClose={() => setShowConfirmation(false)}
                    onConfirm={deleteRoom}
                />
            )}
        </div>
    );
}

export default FormCRUDRooms;
