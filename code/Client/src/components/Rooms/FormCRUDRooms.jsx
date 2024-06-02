import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { DeleteConfirmation } from '../utils/Alert.jsx';
import FormRooms from "./FormRooms";
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';

function FormCRUDRooms() {

    const [rooms, setRooms] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    // Stores the room to be deleted
    const [roomToDelete, setRoomToDelete] = useState(null);

    const { token } = useContext(AuthContext);


    useEffect(() => {
        const fetchRooms = () => {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('http://localhost:4000/rooms')
                .then(response => {
                    setRooms(response.data);
                })
                .catch(error => {
                    toast.error('Error fetching rooms');
                    console.error('Error fetching rooms', error);
                });
        };

        fetchRooms(); // Fetch immediately on component mount
        const interval = setInterval(fetchRooms, 10000); // Refresh every 10 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);



    const initiateDeleteRoom = (room) => {
        setRoomToDelete(room);
        setShowConfirmation(true);
    };

    const deleteRoom = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`http://localhost:4000/rooms/?url=${roomToDelete.image_url}`)
            .then(() => {
                setRooms(rooms.filter(r => r.id_room !== roomToDelete.id_room));
                setShowConfirmation(false);
                toast.success('Room deleted successfully');
            })
            .catch(error => {
                toast.error('Error deleting room');
                console.error('Error deleting room', error);
            });
    };
    return (
        <div className=' px-4 py-5 bg-white shadow-lg rounded-lg border mx-auto'>
            <h2 className="text-2xl font-semibold text-fourth text-center mb-6">Upload Room</h2>
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
