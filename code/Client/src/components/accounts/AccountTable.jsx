import React, { useEffect, useState } from 'react';
import Axios from '../../services/Axios';
import { toast } from 'react-toastify';
import DeleteAlert from './DeleteAlert.jsx';

function AccountTable({ onUserUpdated, onUserDeleted }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get('/accounts');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [roleFilter, searchTerm, users]);

  const filterUsers = () => {
    let filtered = users.filter((user) => {
      if (roleFilter !== 'all' && user.rol !== roleFilter) {
        return false;
      }
      const fullName = `${user.name} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handleUpdateUser = (user) => {
    onUserUpdated(user);
  };

  const handleDeleteUser = (user) => {
    setShowDeleteAlert(true);
    setUserToDelete(user);
  };

  const deleteUser = async () => {
    try {
      setShowDeleteAlert(false);
      const response = await Axios.delete(`/accounts/${userToDelete.email}`);
      if (response.status === 200) {
        toast.success('User deleted successfully');
        const updatedUsers = users.filter((u) => u.email !== userToDelete.email);
        setUsers(updatedUsers);
        onUserDeleted();
      }
    } catch (error) {
      toast.error('Error deleting user');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-fourth text-center mb-4">Accounts</h2>
      
      <div className="flex justify-between mb-4">
        <div className=' w-2/6'>
          <input 
            type="text" 
            id="search" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="border p-2 rounded bg-gray-100 w-full"
            placeholder="Search"
          />
        </div>
        
        <div>
          <label htmlFor="roleFilter" className="mr-2">Role:</label>
          <select 
            id="roleFilter"
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)} 
            className="border p-2 rounded bg-gray-100"
          >
            <option value="all">All</option>
            <option value="user">Client</option>
            <option value="admin">Admin</option>
            <option value="otherRole">Other Role</option>
          </select>
        </div>
      </div>
      
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
            {filteredUsers.map((user) => (
              <tr key={user.email}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.name} {user.last_name}</td>
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
            onClose={() => setShowDeleteAlert(false)}
            onConfirm={deleteUser}
        />
      )}
    </div>
  );
}

export default AccountTable;
