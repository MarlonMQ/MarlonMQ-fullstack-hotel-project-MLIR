import React, { useState, useEffect } from "react";
import Axios from '../../services/Axios';
import { toast } from "react-toastify";

function AccountTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Función para obtener los usuarios
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('/accounts'); // Suponiendo que la ruta para obtener los usuarios es /users
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <table className="w-full mt-5">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Email
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Role
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.rol}</td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <div className="flex space-x-5">
                <button className="text-blue-500 hover:text-blue-700">Update</button>
                <button className="text-red-500 hover:text-red-700">Delete</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AccountTable;