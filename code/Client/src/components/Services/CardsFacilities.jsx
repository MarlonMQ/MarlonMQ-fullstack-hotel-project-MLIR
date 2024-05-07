<<<<<<< HEAD
import React from "react";
import axios from 'axios';

export default function CardsFacilities({ image, title, setServices, services}) {

    const deleteService = (imageUrl) => {
        axios.delete(`http://localhost:4000/services/deleteService?url=${imageUrl}`)
            .then(response => {
                // Actualizar el estado de servicios para reflejar la eliminación
                setServices(services.filter(service => service.imageUrl !== imageUrl));
            })
            .catch(error => {
                console.error('Error deleting service', error);
            });
    };
    
    console.log("facilities: ",image);

    return (
        <div className="relative flex flex-col items-center mb-10 ">
            <img src={image} alt={title} className="items-center px-12 rounded-md brightness-50"/>
            <h2 className="text-black secondary-title text-center bg-white absolute bottom-0 px-16 ">{title}</h2>
            <div>
                <button className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => deleteService(image)}>Eliminar</button>
            </div>
        </div>
    );
=======
import React, { useState } from "react";
import axios from 'axios';
import { DeleteConfirmation } from './FacilitiesUtils';

export default function CardsFacilities({ image, title }) {
  const admin = true;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteService = (imageUrl) => {
    axios.delete(`http://localhost:4000/services/?url=${imageUrl}`)
      .then(response => {
        // Actualizar el estado de servicios para reflejar la eliminación
        setServices(services.filter(service => service.imageUrl !== imageUrl));
      })
      .catch(error => {
        console.error('Error deleting service', error);
      });
  };

  return (
    <div className="relative flex flex-col items-center mb-10">
      <img src={image} alt={title} className="items-center rounded-md brightness-50 object-cover px-12" />
      <h2 className="text-black secondary-title text-center bg-white absolute bottom-0 px-16 ">{title}</h2>
      {admin && (
        <div >
          <button
            className="absolute top-0 right-0 bg-red-500 text-white py-2 px-2 rounded-md mx-12"
            onClick={() => setShowConfirmation(true)}
          >
            Eliminar
          </button>
          <DeleteConfirmation
            show={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={() => {
              deleteService(image);
              setShowConfirmation(false);
            }}
          />
        </div>
      )}
    </div>
  );
>>>>>>> 50b720c785d864051cd777f26992ad1ba7112d0b
}
