import React, { useEffect, useState } from 'react';
import Axios from '../../services/Axios.js';
import { toast } from 'react-toastify';
import DeleteAlert from './components/DeleteAlert.jsx';
import UserInformation from './components/UserInformation.jsx';

function AccountTable({ shouldFetchUsers, onUserUpdated, onUserDeleted }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [userToShow, setUserToShow] = useState({});
  const [showUserInformation, setShowUserInformation] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await Axios.get('/accounts');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [shouldFetchUsers]);

  useEffect(() => {
    filterUsers();
  }, [roleFilter, searchTerm, users, sortBy, sortDirection]);

  const filterUsers = () => {
    let filtered = users.filter((user) => {
      if (roleFilter !== 'all' && user.rol !== roleFilter) {
        return false;
      }
      const fullName = `${user.name} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
    });

    if (sortBy === 'name') {
      filtered.sort((a, b) => (sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    } else if (sortBy === 'email') {
      filtered.sort((a, b) => (sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email)));
    } else if (sortBy === 'role') {
      filtered.sort((a, b) => (sortDirection === 'asc' ? a.rol.localeCompare(b.rol) : b.rol.localeCompare(a.rol)));
    }

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

  const handleSort = (criteria) => {
    if (criteria === sortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortDirection('asc');
    }
  }

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Email copied to clipboard');
  };

  const handleShowUserInformation = (user) => {
    setUserToShow(user);
    setShowUserInformation(true);
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
            <option value="employee">Employee</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-5 py-3 border-gray-200 bg-gray-100 hover:bg-gray-300 tracking-wider cursor-pointer transition-all duration-150 ease-in-out" onClick={() => handleSort('name')}>
                  <div className='text-left text-xs text-gray-600 uppercase font-semibold select-none'>Name</div>
              </th>
              <th className="px-5 py-3 border-gray-200 bg-gray-100 hover:bg-gray-300 tracking-wider cursor-pointer transition-all duration-150 ease-in-out" onClick={() => handleSort('email')}>
                  <div className='text-left text-xs text-gray-600 uppercase font-semibold select-none'>Email</div>
              </th>
              <th className="px-5 py-3 border-gray-200 bg-gray-100 hover:bg-gray-300 tracking-wider cursor-pointer transition-all duration-150 ease-in-out" onClick={() => handleSort('role')}>
                  <div className='text-left text-xs text-gray-600 uppercase font-semibold select-none'>Role</div>
              </th>
              <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"/>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.email} className=''>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:underline cursor-pointer " onClick={() => handleShowUserInformation(user)}>{user.name} {user.last_name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:underline cursor-pointer" onClick={() => handleCopyToClipboard(user.email)}>{user.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.rol === 'user' ? 'Client' : 'Employee'}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div className="flex space-x-5 justify-center">
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
      {showUserInformation && (
        <UserInformation
        user={userToShow}
        onClose={() => setShowUserInformation(false)}
        />
      )}
    </div>
  );
}

export default AccountTable;
