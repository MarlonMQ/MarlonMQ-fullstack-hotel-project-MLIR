import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GrayBox from '../components/registerComponents/GrayBox.jsx';
import FormBox from '../components/registerComponents/FormBox.jsx';
import { toast } from 'react-toastify';
import Axios from '../services/Axios.js';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required field'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Axios.post('/forgot-password', values);
        if (response.status === 200) {
          toast.success('Email sent');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return(
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
        </div>

        <GrayBox
          title="Forgot Password"
          buttonText="Send email"
          onButtonClick={formik.handleSubmit}
        >
          <FormBox
            title="Email"
            name="email"
            type="email"
            value={formik.values.email}
            change={formik.handleChange}
            blur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />    
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
};

export default ForgotPassword;