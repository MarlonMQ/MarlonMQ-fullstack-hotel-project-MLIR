import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AccountFormBox from './AccountFormBox.jsx';
import AccountCountryRegionSelector from './AccountCountryRegionSelector.jsx';
import RoleSelector from './AccountRolSelector.jsx';

function AccountForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastName: '',
      birthDate: '',
      phone: '',
      country: '',
      region: '',
      address: '',
      rol: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required field'),
      password: Yup.string().required('Required field'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required field'),
      name: Yup.string().required('Required field'),
      lastName: Yup.string().required('Required field'),
      birthDate: Yup.date()
      .required('Required field')
      .test('is-of-age', 'You must be at least 18 years old', function(value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age > 18;
        }
        return age >= 18;
      }),
      phone: Yup.string().required('Required field'),
      country: Yup.string().required('Required field'),
      region: Yup.string().required('Required field'),
      address: Yup.string().required('Required field'),
      rol: Yup.string().required('Required field'),
    }),
    onSubmit: async (values, { setErrors }) => {
      // Logic to submit the form
      try {
        const response = await Axios.post('/signup', values);
        if (response.status === 201) {
          console.log('Account created successfully');
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setview(0); // Show the first FormBox if there is an error (wrong email or password)
          setErrors({ email: 'The email is already registered' });
        } else {
          console.error(error);
        }
      }
      return 0;
    },
  });

  const selectCountry = (val) => {
    formik.handleChange('country')(val);
    setCountry(val);
    // Reset region when country changes
    setRegion('');
  };

  const selectRegion = (val) => {
    formik.handleChange('region')(val);
    setRegion(val);
  };

  return (
    <div className=' px-12'>
        <div className=' px-4 py-5 bg-white shadow-lg rounded-lg border mx-auto'>
          <h2 className="text-2xl font-semibold text-fourth text-center mb-6">Create an Account</h2>
          <form onSubmit className="flex flex-wrap -mx-2">
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
                    />
                </div>
                <div className="px-2 w-full sm:w-1/2">
                  <RoleSelector
                    value={formik.values.rol}
                    handleChange={formik.handleChange}
                    error={formik.touched.rol && formik.errors.rol}
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
                    />
                </div>
                <div className="px-2 w-full">
                    <button type="submit" className="mt-4 w-full  bg-fourth hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default AccountForm;