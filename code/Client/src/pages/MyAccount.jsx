import React, { useState, useEffect, useContext } from 'react';
import Axios from '../services/Axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CountryRegionSelector from '../components/registerComponents/CountryRegionSelector';
import GrayBox from '../components/registerComponents/GrayBox';
import FormBox from '../components/registerComponents/FormBox';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/loginComponents/AuthContext';

import DisabledContext from 'antd/es/config-provider/DisabledContext';

function MyAccount() {
  const { token } = useContext(AuthContext);
  const [base64Image, setBase64Image] = useState('');
  const [account, setAccount] = useState({});

  const fetchAccount = async () => {
    try {
      const response = await Axios.post('/myAccount', {token});
      if (response.status === 200) {
        setAccount(response.data);
        console.log(response.data);

        if (response.data.profile_image) {
          const base64String = btoa(
            new Uint8Array(response.data.profile_image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          setBase64Image(`data:image/jpeg;base64,${base64String}`);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response.data);
      } else {
        console.log('Error fetching account');
      }
    }
  };
  useEffect(() => {
    fetchAccount();
  }, []);

  const birthDate = new Date(account.birth_date).toLocaleDateString('en-CA');

  return (
    <div className="flex flex-col sm:flex-row h-full w-full bg-gray-100 pt-5">
      <div className="w-full mb-20 sm:w-4/6  bg-white p-14 mx-auto my-auto shadow-lg rounded-lg flex flex-col">
        <h1 className="text-4xl font-bold text-fourth mb-8">My Account</h1>
        
        <div className='flex sm:flex-row flex-col'>
          <div className='w-1/2 items-center justify-center'>
            <div className='relative size-80 flex group items-center justify-center'>
              {base64Image ?
              (<div className='flex items-center justify-center cursor-pointer'>
                <img src={base64Image} className='object-cover rounded-full absolute w-full h-full group-hover:opacity-75 transition-all duration-300 ease-in-out' />
                <div className='absolute w-3/6 h-3/6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-center text-2xl font-semibold'>
                  Change profile image
                </div>
              </div>)
              :
              
              
              (<div className='flex items-center justify-center cursor-pointer'>
                <img src="src/assets/images/no_profile_image.png" className='absolute w-full h-full group-hover:opacity-75 transition-all duration-300 ease-in-out' />
                <img src="src/assets/images/add_profile_image.png" className='absolute w-3/6 h-3/6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' />
              </div>)

              }
            </div>
          </div>    
          <div className=" w-1/2 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
              <p className="text-gray-600">{account.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Name:</h2>
              <p className="text-gray-600">{account.name} {account.last_name}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Phone Number:</h2>
              <p className="text-gray-600">{account.phone_number}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Birth Date:</h2>
              <p className="text-gray-600">{birthDate}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Country:</h2>
              <p className="text-gray-600">{account.country}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">City:</h2>
              <p className="text-gray-600">{account.region}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Address:</h2>
              <p className="text-gray-600">{account.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

