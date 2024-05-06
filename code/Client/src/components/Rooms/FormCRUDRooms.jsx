import React, { useState, useEffect } from "react";
import axios from 'axios';
import { DeleteConfirmation } from '../Services/FacilitiesUtils';
import FormRooms from "./FormRooms";


function FormCRUDRooms() {
    const [rooms, setRooms] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = () => {
        axios.get('http://localhost:4000/rooms/getDataRooms')
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching rooms', error);
            });
    };

    const initiateDeleteService = (service) => {
        setServiceToDelete(service);
        setShowConfirmation(true);
    };

    const deleteService = () => {
        axios.delete(`http://localhost:4000/services/?url=${serviceToDelete.imageUrl}`)
            .then(() => {
                setRooms(rooms.filter(s => s.ServiceId !== serviceToDelete.ServiceId));
                setShowConfirmation(false);
            })
            .catch(error => {
                console.error('Error deleting service', error);
            });
    };
    // console.log("______data rooms_________", rooms);
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
                                        onClick={() => initiateDeleteService(room)}
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
                    onConfirm={deleteService}
                />
            )}
        </div>
    );
}

export default FormCRUDRooms;
