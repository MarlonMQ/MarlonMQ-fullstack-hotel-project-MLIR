import React, { useState, useEffect } from 'react';
import moment from 'moment'; // Importa Moment.js

function ReservationTable({ reservations }) {
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);

  // Función para manejar el cambio en el campo de entrada
  const handleSearchInputChange = (e) => {
    setSearchEmail(e.target.value);
  };

  // Función para manejar la búsqueda de reservas por correo electrónico
  const handleSearch = () => {
    if (searchEmail.trim() === '') {
      setFilteredReservations(reservations);
    } else {
      const filtered = reservations.filter((reservation) =>
        reservation.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredReservations(filtered);
    }
  };

  // Actualizar las reservas filtradas cuando cambian las reservas
  useEffect(() => {
    setFilteredReservations(reservations);
  }, [reservations]);

  return (
    <div className="mt-4 overflow-x-auto relative shadow-md sm:rounded-lg">
      {/* Campo de búsqueda por correo electrónico */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por correo electrónico"
          value={searchEmail}
          onChange={handleSearchInputChange}
          className="w-full p-2 border rounded mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
      </div>
      {/* Tabla de reservas */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Email del cliente
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha de inicio
            </th>
            <th scope="col" className="py-3 px-6">
              Fecha de fin
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Mostrar las reservas filtradas */}
          {filteredReservations.map(({ email, fecha_inicio, fecha_fin }, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="py-4 px-6">{email}</td>
              <td className="py-4 px-6">{moment(fecha_inicio).format('YYYY-MM-DD')}</td>
              <td className="py-4 px-6">{moment(fecha_fin).format('YYYY-MM-DD')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;
