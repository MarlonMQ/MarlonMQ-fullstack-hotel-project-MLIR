import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DeleteConfirmation } from '../utils/Alert.jsx';
import moment from 'moment';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';
import EditReservationForm from './EditReservationForm.jsx';

function ReservationTable() {
  const [reservations, setReservations] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [reservationToEdit, setReservationToEdit] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const { token } = useContext(AuthContext);

  const fetchReservations = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:4000/reservations')
        .then(response => {
            const formattedReservations = response.data.map(reservation => ({
                ...reservation,
                arrival_date: moment(reservation.arrival_date).add(1, "days").format('YYYY-MM-DD'),
                departure_date: moment(reservation.departure_date).add(1, "days").format('YYYY-MM-DD'),
                room_type: reservation.room_type
            }));
            setReservations(formattedReservations);
            setFilteredReservations(formattedReservations);
        })
        .catch(error => {
            // toast.error('Error fetching reservations');
        });
};

  useEffect(() => {
    fetchReservations();
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

  const initiateEditReservation = (reservation) => {
    setReservationToEdit(reservation);
  };

  const handleEditSave = (updatedReservation) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.put(`http://localhost:4000/reservations/${updatedReservation.id_reserve}`, updatedReservation)
      .then(response => {
        setReservationToEdit(null);
        fetchReservations();
        toast.success('Reservation updated successfully');
      })
      .catch(error => {
        toast.error('Error updating reservation');
      });
  };

  const handleStatusChange = (reservation, newStatus) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.put(`http://localhost:4000/reservations/${reservation.id_reserve}/changestatus`, { status: newStatus })
      .then(response => {
        fetchReservations();
        toast.success('Reservation status updated successfully');
      })
      .catch(error => {
        toast.error('Error updating reservation status');
      });
  };

  const toggleDropdown = (reservationId) => {
    setSelectedReservation(selectedReservation === reservationId ? null : reservationId);
  };

  return (
    <div className="mt-4 overflow-x-auto relative shadow-md sm:rounded-lg">
      <h2 className="text-2xl font-semibold text-fourth text-center mb-8">Reservation List</h2>
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
      <table className="w-full secundary-text text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">Client Email</th>
            <th scope="col" className="py-3 px-6">Start Date</th>
            <th scope="col" className="py-3 px-6">End Date</th>
            <th scope="col" className="py-3 px-6">Room Type</th>
            <th scope="col" className="py-3 px-6">Status</th>
            <th scope="col" className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index} className="bg-white border ">
              <td className="py-4 px-6">{reservation.email}</td>
              <td className="py-4 px-6">{reservation.arrival_date}</td>
              <td className="py-4 px-6">{reservation.departure_date}</td>
              <td className="py-4 px-6">{reservation.room_type}</td>
              <td className="py-4 px-6">
                <span className={`px-2 py-1 rounded ${reservation.stat === 'Cancelled' ? 'bg-red-500 text-white' : reservation.stat === 'Paid' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                  {reservation.stat}
                </span>
                <button
                  className="ml-2"
                  onClick={() => toggleDropdown(reservation.id_reserve)}
                >
                  &#8942;
                </button>
                {selectedReservation === reservation.id_reserve && (
                  <div className="absolute bg-white shadow-md rounded mt-2">
                    <button className="block px-4 py-2 secundary-text text-black hover:bg-gray-200" onClick={() => handleStatusChange(reservation, 'Outstanding')}>Outstanding</button>
                    <button className="block px-4 py-2 secundary-text text-black hover:bg-gray-200" onClick={() => handleStatusChange(reservation, 'Paid')}>Paid</button>
                    <button className="block px-4 py-2 secundary-text text-black hover:bg-gray-200" onClick={() => handleStatusChange(reservation, 'Cancelled')}>Cancelled</button>
                  </div>
                )}
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => initiateEditReservation(reservation)}
                  className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-4">
                  Edit
                </button>
                <button
                  onClick={() => initiateDeleteReservation(reservation)}
                  className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reservationToEdit && (
        <EditReservationForm
          reservation={reservationToEdit}
          onSave={handleEditSave}
          onCancel={() => setReservationToEdit(null)}
        />
      )}

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
