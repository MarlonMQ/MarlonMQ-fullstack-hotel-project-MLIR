import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const EditReservationForm = ({ reservation, onSave, onCancel }) => {
  const [editedEmail, setEditedEmail] = useState(reservation.email || '');
  const [editedStartDate, setEditedStartDate] = useState(reservation.fecha_inicio ? moment(reservation.fecha_inicio).format('YYYY-MM-DD') : '');
  const [editedEndDate, setEditedEndDate] = useState(reservation.fecha_fin ? moment(reservation.fecha_fin).format('YYYY-MM-DD') : '');
  const [editedFirstName, setEditedFirstName] = useState(reservation.first_name || '');
  const [editedLastName, setEditedLastName] = useState(reservation.last_name || '');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEditedEmail(value);
    if (name === 'startDate') setEditedStartDate(value);
    if (name === 'endDate') setEditedEndDate(value);
    if (name === 'first_name') setEditedFirstName(value);
    if (name === 'last_name') setEditedLastName(value);
  };

  const validate = () => {
    const newErrors = {};
    if (!editedEmail) newErrors.email = 'Email is required';
    if (!editedFirstName) newErrors.first_name = 'First name is required';
    if (!editedLastName) newErrors.last_name = 'Last name is required';
    if (!editedStartDate) newErrors.startDate = 'Start date is required';
    if (!editedEndDate) newErrors.endDate = 'End date is required';
    if (moment(editedStartDate).isBefore(moment().startOf('day'))) newErrors.startDate = 'Start date cannot be in the past';
    if (moment(editedEndDate).isBefore(moment(editedStartDate))) newErrors.endDate = 'End date cannot be before start date';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedReservation = {
      ...reservation,
      email: editedEmail,
      lastName: editedLastName,
      checkIn: editedStartDate,
      checkOut: editedEndDate,
    };
    onSave(updatedReservation);
  };

  return (
    <div className="mt-4 p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-4">Edit Reservation</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="first_name"
          value={editedFirstName}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={editedLastName}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Client Email</label>
        <input
          type="text"
          name="email"
          value={editedEmail}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={editedStartDate}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Date</label>
        <input
          type="date"
          name="endDate"
          value={editedEndDate}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
      </div>
      <div className="flex items-center">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-4">Save</button>
        <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
};

EditReservationForm.propTypes = {
  reservation: PropTypes.shape({
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    fecha_inicio: PropTypes.string,
    fecha_fin: PropTypes.string,
    id_reserve: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditReservationForm;

