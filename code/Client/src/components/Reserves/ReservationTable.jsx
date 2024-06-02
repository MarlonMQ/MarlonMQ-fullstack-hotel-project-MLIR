import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DeleteConfirmation } from '../utils/Alert.jsx';
import moment from 'moment';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';

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
        toast.error('Error fetching reservations');
        console.error('Error fetching reservations:', error);
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
    if (reservationToDelete && reservationToDelete.id_reserve) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.delete(`http://localhost:4000/reservations/${reservationToDelete.id_reserve}`)
        .then(response => {
          fetchReservations();
          setShowConfirmation(false);
          setReservationToDelete(null);
          toast.success('Reservation deleted successfully');
        })
        .catch(error => {
          toast.error('Error deleting reservation');
          console.error('Error deleting reservation:', error);
        });
    } else {
      console.error('No reservation selected or reservation ID is missing');
    }
  };

  return (
    <div className="mt-4 overflow-x-auto relative shadow-md sm:rounded-lg">
       <h2 className="text-2xl font-semibold text-fourth text-center mb-6">Reservation List</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={handleSearchInputChange}
          className="w-full p-2 border rounded mr-2"
        />
        <button onClick={fetchReservations} className="bg-fourth text-white px-4 py-2 rounded">Refresh</button>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">Client Email</th>
            <th scope="col" className="py-3 px-6">Start Date</th>
            <th scope="col" className="py-3 px-6">End Date</th>
            <th scope="col" className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index} className="bg-white border ">
              <td className="py-4 px-6">{reservation.email}</td>
              <td className="py-4 px-6">{moment(reservation.fecha_inicio).format('YYYY-MM-DD')}</td>
              <td className="py-4 px-6">{moment(reservation.fecha_fin).format('YYYY-MM-DD')}</td>
              <td className="py-4 px-6">
                <button
                  onClick={() => initiateDeleteReservation(reservation)}
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
          onConfirm={deleteReservation}
        />
      )}
    </div>
  );
}

export default ReservationTable;
