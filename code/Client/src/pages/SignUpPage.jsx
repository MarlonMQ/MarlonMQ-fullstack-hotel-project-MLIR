import React, { useState, useEffect } from 'react';
import Axios from '../services/Axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CountryRegionSelector from '../components/registerComponents/CountryRegionSelector';
import GrayBox from '../components/registerComponents/GrayBox';
import FormBox from '../components/registerComponents/FormBox';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();

  const [view, setview] = useState(0); // State to control the visibility of the first FormBox
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

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
      rol: 'user',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required field'),
      password: Yup.string()
        .min(5, 'Password must be at least 5 characters')
        .max(20, 'Password cannot be longer than 20 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Required field'),
      
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required field'),
      
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
    }),

    onSubmit: async (values, { setErrors }) => {
      // Logic to submit the form
      try {
        const response = await Axios.post('/signup', values);
        if (response.status === 201) {
          navigate('/login', { state: { accountCreated: true } });
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

  const handleButtonClick = () => {
    formik.handleSubmit();
    if (view === 0 && !formik.errors.email && !formik.errors.password && !formik.errors.confirmPassword) {
      if (formik.values.email !== '' && formik.values.password !== '' && formik.values.confirmPassword !== '' && formik.values.name === '') {
        formik.setTouched({}, false);
        setview(1); // Show the second FormBox only if there are no errors in the first form
      }
    } else if (view === 1 && !formik.errors.name && !formik.errors.lastName && !formik.errors.birthDate && !formik.errors.phone) {
      formik.setTouched({}, false);
      setview(2); // Show the third FormBox only if there are no errors in the second form
    }
  };

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
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
        </div>

        <GrayBox
          title="Sign Up"
          buttonText="Continue"
          hrefLink="/login"
          hrefText="Already have an account? Sign in"
          onButtonClick={handleButtonClick}
        >

          {view === 0 && (
            <>
              <FormBox
                title="Email"
                name="email"
                type="email"
                value={formik.values.email}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                tabIndex={1}
              />
              <FormBox
                title="Password"
                name="password"
                type="password"
                value={formik.values.password}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.password && formik.errors.password}
                tabIndex={2}
              />
              <FormBox
                title="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                tabIndex={3}
              />
            </>
          )}
          {view === 1 && (
            <>
              <FormBox
                title="Name"
                name="name"
                type="text"
                value={formik.values.name}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                tabIndex={4}
              />
              <FormBox
                title="Last Name"
                name="lastName"
                type="text"
                value={formik.values.lastName}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.lastName && formik.errors.lastName}
                tabIndex={5}
              />
              <FormBox
                title="Birth Date"
                name="birthDate"
                type="date"
                value={formik.values.birthDate}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.birthDate && formik.errors.birthDate}
                tabIndex={6}
              />
              <FormBox
                title="Phone"
                name="phone"
                type="tel"
                value={formik.values.phone}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                tabIndex={7}
              />
            </>
          )}
          {view === 2 && (
            <>
              <CountryRegionSelector
                country={formik.values.country}
                selectCountry={selectCountry}
                region={formik.values.region}
                selectRegion={selectRegion}
                countryError={formik.touched.country && formik.errors.country}
                regionError={formik.touched.region && formik.errors.region}
                tabIndexCountry={8}
                tabIndexRegion={9}
              />
              <FormBox
                title="Address"
                name="address"
                type="text"
                value={formik.values.address}
                change={formik.handleChange}
                blur={formik.handleBlur}
                error={formik.touched.address && formik.errors.address}
                tabIndex={10}
              />
            </>
          )}
        </GrayBox>
      </div>

      <div className="hidden sm:block sm:w-1/2 justify-center items-center">
        <img
          src={'src/assets/hotelPictures/Hotel-image08.jpg'}
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignUpPage;

