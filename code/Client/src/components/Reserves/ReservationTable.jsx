import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DeleteConfirmation } from '../Services/FacilitiesUtils';
import moment from 'moment';
import { AuthContext } from '../loginComponents/AuthContext.jsx';

function ReservationTable() {
  const [reservations, setReservations] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  const { token } = useContext(AuthContext);

  const fetchReservations = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:4000/reservations')
      .then(response => {
        setReservations(response.data);
        setFilteredReservations(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las reservaciones:', error);
      });
  };

  useEffect(() => {
    fetchReservations();
    const intervalId = setInterval(fetchReservations, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const filtered = searchEmail.trim() === '' ? reservations : reservations.filter((reservation) =>
      reservation.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredReservations(filtered);
  }, [searchEmail, reservations]);

  const handleSearchInputChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const initiateDeleteReservation = (reservation) => {
    setReservationToDelete(reservation);
    setShowConfirmation(true);
  };

  const deleteReservation = () => {
    if (reservationToDelete && reservationToDelete.id_reserva) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.delete(`http://localhost:4000/reservations/${reservationToDelete.id_reserva}`)
        .then(response => {
          fetchReservations();
          setShowConfirmation(false);
          setReservationToDelete(null);
        })
        .catch(error => {
          console.error('Error al eliminar la reserva:', error);
        });
    } else {
      console.error('No reservation selected or reservation ID is missing');
    }
  };

  return (
    <div className="mt-4 overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por correo electrónico"
          value={searchEmail}
          onChange={handleSearchInputChange}
          className="w-full p-2 border rounded mr-2"
        />
        <button onClick={fetchReservations} className="bg-blue-500 text-white px-4 py-2 rounded">Refrescar</button>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">Email del cliente</th>
            <th scope="col" className="py-3 px-6">Fecha de inicio</th>
            <th scope="col" className="py-3 px-6">Fecha de fin</th>
            <th scope="col" className="py-3 px-6">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-4 px-6">{reservation.email}</td>
              <td className="py-4 px-6">{moment(reservation.fecha_inicio).format('YYYY-MM-DD')}</td>
              <td className="py-4 px-6">{moment(reservation.fecha_fin).format('YYYY-MM-DD')}</td>
              <td className="py-4 px-6">
                <button
                  onClick={() => initiateDeleteReservation(reservation)}
                  className="text-red-500 hover:text-red-700">
                  Eliminar
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
          onConfirm={deleteReservation}
        />
      )}
    </div>
  );
}

export default ReservationTable;