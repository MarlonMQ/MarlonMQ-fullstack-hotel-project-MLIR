import React, { useState, useEffect, useContext } from 'react';

function UserInformation({user, onClose, onConfirm }) {
  const age = calculateAge(user.birth_date);
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    if (user.profile_image) {
      const base64String = btoa(
        new Uint8Array(user.profile_image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setBase64Image(`data:image/jpeg;base64,${base64String}`);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md text-justify">
      <div className='w-full flex justify-center'>
        <div className=' relative size-60 flex items-center justify-center mb-4'>
          {base64Image ?
            (
            <img src={base64Image} className='object-cover rounded-full absolute w-full h-full' />
            ):(
            <img src="src/assets/images/no_profile_image.png" className='absolute w-full h-full' />
            )
          }
        </div>
      </div>
      <Line title="Name" value={`${user.name} ${user.last_name}`} />
      <Line title="Email" value={user.email} />
      <Line title="Phone Number" value={user.phone_number} />
      <Line title="Birth date" value={`${user.birth_date} (${age} years old)`} />
      <Line title="Role" value={user.rol} />
      <Line title="From" value={`${user.country}, ${user.region}`} />
      <Line title="Address" value={user.address} />
      <div className="flex justify-center">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded-md"
        onClick={onClose}
      >
        Close
      </button>
      </div>
    </div>
    </div>
  );
}

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
}

function Line({title, value}) {
  return (
    <div className="mb-4 flex flex-row">
      <p className=" font-bold">
        {title}:&nbsp;</p>
      {value}
    </div>
  );
}

export default UserInformation;
