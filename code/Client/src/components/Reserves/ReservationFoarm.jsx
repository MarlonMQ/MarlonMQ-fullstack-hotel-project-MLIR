import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ReservationTable from './ReservationTable';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';

function ReservationForm() {
  const { token } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    status: 'Outstanding',
    id_room: '',
    services: [],
    roomNumber: 0,
    totalAmount: 0
  });
  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get('http://localhost:4000/rooms');
      setRooms(response.data);
    } catch (error) {
      toast.error('Error fetching rooms');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required.';
      formIsValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required.';
      formIsValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required.';
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format.';
      formIsValid = false;
    }

    if (!formData.checkIn) {
      errors.checkIn = 'Check-in date is required.';
      formIsValid = false;
    }

    if (!formData.checkOut) {
      errors.checkOut = 'Check-out date is required.';
      formIsValid = false;
    } else if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
      errors.checkOut = 'Check-out date must be after check-in date.';
      formIsValid = false;
    }

    if (!formData.id_room) {
      errors.id_room = 'Room is required.';
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form data is valid, send the POST request
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post('http://localhost:4000/reservations/', formData);
        
        toast.success('Reservation created successfully!');
        
        // You can redirect the user or clear the form here
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          checkIn: '',
          checkOut: '',
          status: 'Outstanding',
          id_room: '',
          services: [],
          roomNumber: 0,
          totalAmount: 0
        });
      } catch (error) {
        toast.error('Error creating reservation');
      }
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  return (
    <div className=' px-12'>
      <div className=' px-4 py-5 bg-white shadow-lg rounded-lg border mx-auto'>
        <h2 className="text-2xl font-semibold text-fourth text-center mb-6 mt-4">Make a Reservation</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
          <div className="px-2 w-full sm:w-1/2">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
          </div>
          <div className="px-2 w-full sm:w-1/2">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
          </div>
          <div className="px-2 w-full">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Example: youremail@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="px-2 w-full sm:w-1/2">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900">Check-in Date</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.checkIn ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.checkIn && <p className="text-red-500 text-xs italic">{errors.checkIn}</p>}
          </div>
          <div className="px-2 w-full sm:w-1/2">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900 ">Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.checkOut ? 'border-red-500' : 'border-gray-300'} rounded`}
            />
            {errors.checkOut && <p className="text-red-500 text-xs italic">{errors.checkOut}</p>}
          </div>
          <div className="px-2 w-full">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900">Room type</label>
            <select
              name="id_room"
              value={formData.id_room}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.id_room ? 'border-red-500' : 'border-gray-300'} rounded`}
            >
              {rooms.map((room) => (
                <option key={room.id_room} value={room.id_room}>
                  {room.room_type}
                </option>
              ))}
            </select>
            {errors.id_room && <p className="text-red-500 text-xs italic">{errors.id_room}</p>}
          </div>
          <div className="px-2 w-full">
            <label className="block mb-4 mt-4 secondary-text font-medium text-gray-900">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`block w-full p-3 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded`}
            >
              <option value="Outstanding">Outstanding</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="px-2 w-full">
            <button type="submit" className="mt-4 w-full bg-fourth hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Reserve
            </button>
          </div>
        </form>
        <ReservationTable />
      </div>
    </div>
  );
}

export default ReservationForm;
