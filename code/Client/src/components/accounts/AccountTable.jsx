import React, { useEffect, useState, useContext } from 'react';
import Axios from '../../services/Axios';
import { toast } from 'react-toastify';
import DeleteAlert from './DeleteAlert.jsx';
import { AuthContext } from '../loginComponents/AuthContext.jsx';

function AccountTable({ onUserUpdated, onUserDeleted }) {
  const [users, setUsers] = useState([]);
  const [showDeleteAlert, SetShowDeleteAlert] = useState(false);
  const [usertoDelete, setUserToDelete] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('/accounts');
        setUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = (user) => {
    onUserUpdated(user);
  };

  const handleDeleteUser = (user) => {
    SetShowDeleteAlert(true);
    setUserToDelete(user);
  };

  const deleteUser = async () => {
    try {
      SetShowDeleteAlert(false);
      const response = await Axios.delete(`/accounts/${usertoDelete.email}`);
      if (response.status === 200) {
        toast.success('User deleted successfully');
        const updatedUsers = users.filter((u) => u.email !== usertoDelete.email);
        setUsers(updatedUsers);
        onUserDeleted();
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  return (
    <div >
      <h2 className="text-2xl font-semibold text-fourth text-center mb-4">Accounts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.email}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name} {user.lastName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.rol === 'user' ? 'client' : user.rol}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex space-x-5">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleUpdateUser(user)}>Update</button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(user)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeleteAlert && (
        <DeleteAlert
            onClose={() => SetShowDeleteAlert(false)}
            onConfirm={deleteUser}
        />
      )}
    </div>
  );
}

export default AccountTable;
