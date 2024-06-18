import React, { useState } from 'react';
import AccountForm from './AccountsForm';
import AccountTable from './AccountTable';

function AccountsLabel() {
  const [user, setUser] = useState(null);
  const [updatemode, setUpdatemode] = useState(false);
  const [shouldFetchUsers, setShouldFetchUsers] = useState(false);

  const handleUserAddedOrUpdated = () => {
    setUser(null);
    setUpdatemode(false);
    setShouldFetchUsers((prev) => !prev);
  };

  const handleUserUpdated = (updatedUser) => {
    setUser(updatedUser);
    setUpdatemode(true);
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-4 border mx-auto space-y-5'> 
      <AccountForm 
        user={user} 
        updatemode={updatemode} 
        setUpdatemode={setUpdatemode} 
        onUserAddedOrUpdated={handleUserAddedOrUpdated}
      />
      <AccountTable 
        shouldFetchUsers={shouldFetchUsers}
        onUserUpdated={handleUserUpdated}
        onUserDeleted={handleUserAddedOrUpdated}
      />
    </div>
  );
}

export default AccountsLabel;
