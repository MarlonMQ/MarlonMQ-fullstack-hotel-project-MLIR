import React, { useState, useEffect, useContext } from 'react';
import Axios from '../services/Axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CountryRegionSelector from '../components/registerComponents/CountryRegionSelector';
import GrayBox from '../components/registerComponents/GrayBox';
import FormBox from '../components/registerComponents/FormBox';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/loginComponents/AuthContext';

function MyAccount() {
  const {token} = useContext(AuthContext);
  const [account, setAccount] = useState({});

  const fetchAccount = async () => {
    try {
      const response = await Axios.post('/myAccount', {token});
      if (response.status === 200) {
        setAccount(response.data);
        console.log(response.data);
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


  return (
    <div className="flex flex-col sm:flex-row h-screen w-full">
      <div className="w-full mb-20 sm:w-full bg-white p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-fourth">My Account</h1>
          <h1>{account.email}</h1>
          <h1>{account.name} {account.last_name} </h1>
          <h1>{account.phone_number}</h1>
          <h1>{account.birth_date}</h1>
          <h1>{account.country}</h1>
          <h1>{account.city}</h1>
          <h1>{account.address}</h1>
        </div>
        <div className='w-4/5'>

        </div>
      </div>
    </div>
  );
}

export default MyAccount;

