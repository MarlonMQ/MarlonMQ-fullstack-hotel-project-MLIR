import React, { useState, useEffect, useContext } from 'react';
import Axios from '../services/Axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';
import FormBox from '../components/MyAccount/FormBox'; 
import DisabledContext from 'antd/es/config-provider/DisabledContext';

function MyAccount() {
  const { token } = useContext(AuthContext);
  const [base64Image, setBase64Image] = useState('');
  const [account, setAccount] = useState({});
  const [editMode, setEditMode] = useState(true);

  const fetchAccount = async () => {
    try {
      Axios.setToken(token);
      const response = await Axios.get('/myAccount');
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
        
        <div className='flex sm:flex-row flex-col items-center space-y-8 sm:space-y-0'>
          <div className='w-1/2 items-center sm:items-start flex flex-col space-y-5'>
            <h1 className="text-4xl font-bold text-fourth mb-8">My Account</h1>
            {editMode ? (        
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
            ) : (
              <div className='relative size-80 flex items-center justify-center'>
                {base64Image ?
                  (
                  <img src={base64Image} className='object-cover rounded-full absolute w-full h-full' />
                  ):(
                  <img src="src/assets/images/no_profile_image.png" className='absolute w-full h-full' />
                  )
                }
              </div>
              )
            }
          </div>    
          {editMode ? (
              <div className="w-1/2 space-y-2">
                <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="Name"
                      name="name"
                      type="text"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="Last Name"
                      name="last_name"
                      type="text"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="Phone Number"
                      name="phone_number"
                      type="text"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="Birth Date"
                      name="birth_date"
                      type="date"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="Country"
                      name="country"
                      type="text"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="City"
                      name="region"
                      type="text"
                    />
                  </div>
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
                      title="Address"
                      name="address"
                      type="text"
                    />
                  </div>
              </div>
                
            ) : ( 
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
            )
            }
        </div>
      </div>
    </div>
  );
}

export default MyAccount;

