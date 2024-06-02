import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { DeleteConfirmation } from '../utils/Alert.jsx';
import FoamFacilities from './FoamFacilities';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';

function AdminServicesPanel() {
    const [services, setServices] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchServices();
        }, 2000); // Fetches every 60 seconds

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const fetchServices = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get('http://localhost:4000/services/all')
            .then(response => {
                setServices(response.data);

            })
            .catch(error => {
                toast.error('Error fetching services');
                console.error('Error fetching services', error);
            });
    };

    const initiateDeleteService = (service) => {
        setServiceToDelete(service);
        setShowConfirmation(true);
    };

    const deleteService = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.delete(`http://localhost:4000/services/?url=${serviceToDelete.imageUrl}`)
            .then(() => {
                setServices(services.filter(s => s.ServiceId !== serviceToDelete.ServiceId));
                setShowConfirmation(false);
                toast.success('Service deleted successfully');
            })
            .catch(error => {
                toast.error('Error deleting service');
                console.error('Error deleting service', error);
            });
    };

    return (
        <div className='px-4 py-5 bg-white shadow-lg rounded-lg border mx-auto'>
            <h2 className="text-2xl font-semibold text-fourth text-center mb-6">Upload Service</h2>
            <FoamFacilities />
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Title
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
                    {services.map(service => (
                        <tr key={service.ServiceId}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {service.title}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {service.imageUrl}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <img src={service.imageUrl} alt={service.title} className="w-10 h-10 rounded"/>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                    onClick={() => initiateDeleteService(service)}
                                    className="text-red-500 hover:text-red-700">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
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

export default AdminServicesPanel;
