import React, { useState, useContext } from "react";
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import axios from 'axios';
import { DeleteConfirmation } from './FacilitiesUtils';

export default function CardsFacilities({ image, title }) {
  const admin = true;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { token } = useContext(AuthContext);
  
  const deleteService = (imageUrl) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.delete(`http://localhost:4000/services/?url=${imageUrl}`)
      .then(response => {
        //! Actualizar el estado de servicios para reflejar la eliminación
        setServices(services.filter(service => service.imageUrl !== imageUrl));
      })
      .catch(error => {
        console.error('Error deleting service', error);
      });
  };

  return (
    <div className="relative flex flex-col items-center mb-10">
      <img src={image} alt={title} className="items-center rounded-md brightness-50 object-cover px-12" />
      <h2 className="text-black secondary-title text-center bg-white absolute bottom-0 px-16">{title}</h2>
      </div>
  );
}
