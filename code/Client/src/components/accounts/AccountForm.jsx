import React, { useState, useEffect } from 'react';
import Axios from '../../services/Axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountFormBox from './AccountFormBox.jsx';
import AccountCountryRegionSelector from './AccountCountryRegionSelector.jsx';
import RoleSelector from './AccountRolSelector.jsx';

function AccountForm({ user, updatemode, setUpdatemode, onUserAddedOrUpdated }) {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      lastName: '',
      birthDate: '',
      phone: '',
      country: '',
      region: '',
      address: '',
      rol: 'user',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required field'),

      name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Invalid name')
        .min(2, 'Invalid name')
        .max(50, 'Invalid name')
        .required('Required field'),
      
      lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Invalid Last Name')
        .min(2, 'Invalid Last Name')
        .max(50, 'Invalid Last Name')
        .required('Required field'),

      birthDate: Yup.date()
      .required('Required field')
      .test('is-of-age', 'The user must be at least 18 years old', function(value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age > 18;
        }
        return age >= 18;
      }),
      
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number can only contain numbers')
        .max(15, 'Phone number cannot be longer than 15 digits')
        .required('Required field'),

      country: Yup.string().required('Required field'),

      region: Yup.string().required('Required field'),

      address: Yup.string()
        .min(10, 'Address must be at least 10 characters')
        .max(100, 'Address cannot be longer than 100 characters')
        .required('Required field'),

      rol: Yup.string().required('Required field'),
    }),
    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        if (updatemode) {
          const response = await Axios.put('/accounts', values);
          if (response.status === 200) {
            toast.success('Account updated successfully');
          }
        } else {
          const response = await Axios.post('/accounts', values);
          if (response.status === 201) {
            toast.success('Account created successfully');
          }
        }
        resetForm();
        onUserAddedOrUpdated();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({ email: 'The email is already registered' });
          toast.error('The email is already registered');
        } else {
          toast.error('An error occurred. Please try again later');
        }
      }
      setUpdatemode(false);
    },
  });

  useEffect(() => {
    if (user) {
      formik.setValues({
        email: user.email,
        name: user.name,
        lastName: user.last_name,
        birthDate: user.birth_date,
        phone: user.phone_number,
        rol: user.rol,
        country: user.country,
        region: user.region,
        address: user.address,
      });
      setCountry(user.country);
      setRegion(user.region);
    }
  }, [user]);

  const handleButtonClick = () => {
    formik.handleSubmit();
  };

  const handleCancelClick = () => {
    setUpdatemode(false);
    formik.resetForm();
    onUserAddedOrUpdated();
  };

  const selectCountry = (val) => {
    formik.handleChange('country')(val);
    setCountry(val);
    setRegion('');
  };

  const selectRegion = (val) => {
    formik.handleChange('region')(val);
    setRegion(val);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-fourth text-center mb-6">{updatemode ? 'Update Account' : 'Create an Account'}</h2>
      <form className="flex flex-wrap -mx-2">
        <div className="px-2 w-full sm:w-1/2">
          <AccountFormBox 
            title="Name"
            name="name"
            type="text"
            placeholder={"Enter the name"}
            error={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            change={formik.handleChange}
            blur={formik.handleBlur}
            tabIndex={1}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <AccountFormBox 
            title="Last Name"
            name="lastName"
            type="text"
            placeholder={"Enter the last name"}
            error={formik.touched.lastName && formik.errors.lastName}
            value={formik.values.lastName}
            change={formik.handleChange}
            blur={formik.handleBlur}
            tabIndex={2}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <AccountFormBox 
            title="Email"
            name="email"
            type="email"
            placeholder={"Enter the email"}
            error={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            change={formik.handleChange}
            blur={formik.handleBlur}
            tabIndex={3}
            readOnly={updatemode}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <AccountFormBox
            title="Birth Date"
            name="birthDate"
            type="date"
            placeholder={"Enter the birth date"}
            error={formik.touched.birthDate && formik.errors.birthDate}
            value={formik.values.birthDate}
            change={formik.handleChange}
            blur={formik.handleBlur}
            tabIndex={4}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <AccountFormBox 
            title="Phone"
            name="phone"
            type="text"
            placeholder={"Enter the phone number"}
            error={formik.touched.phone && formik.errors.phone}
            value={formik.values.phone}
            change={formik.handleChange}
            blur={formik.handleBlur}
            tabIndex={5}
          />
        </div>
        <div className="px-2 w-full sm:w-1/2">
          <RoleSelector
            value={formik.values.rol}
            handleChange={formik.handleChange}
            error={formik.touched.rol && formik.errors.rol}
            tabIndex={6}
          />
        </div>
        <div className="px-2 w-full">
          <AccountCountryRegionSelector 
            country={formik.values.country}
            selectCountry={selectCountry}
            region={formik.values.region}
            selectRegion={selectRegion}
            countryError={formik.touched.country && formik.errors.country}
            regionError={formik.touched.region && formik.errors.region}
            tabIndexCountry={7}
            tabIndexRegion={8}
          />
        </div>
        <div className="px-2 w-full">
          <AccountFormBox 
            title="Address"
            name="address"
            type="text"
            placeholder={"Enter the address"}
            error={formik.touched.address && formik.errors.address}
            value={formik.values.address}
            change={formik.handleChange}
            blur={formik.handleBlur}
            tabIndex={9}
          />
        </div>
        <div className="px-2 w-full">
          {
            (updatemode == false)
            ?
            <button onClick={handleButtonClick} type='button' className="mt-4 w-full  bg-fourth hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              Create Account
            </button>
            :
            <div className='w-full flex flex-row'>
              <div className="w-1/2 pr-2">
              <button onClick={handleButtonClick} type='button' className="mt-4 w-full bg-green-400 hover:bg-green-700 text-white font-bold py-3  rounded-lg focus:outline-none focus:shadow-outline">
                Update Account
              </button>
              </div>
              <div className="w-1/2 pl-2">
              <button onClick={handleCancelClick} type='button' className="mt-4 w-full  bg-red-400 hover:bg-red-700 text-white font-bold py-3  rounded-lg focus:outline-none focus:shadow-outline">
                Cancel
              </button>
              </div>
            </div>
            
          }
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
