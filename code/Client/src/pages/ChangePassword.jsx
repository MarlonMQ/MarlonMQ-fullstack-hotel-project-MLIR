import {useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GrayBox from '../components/registerComponents/GrayBox.jsx';
import FormBox from '../components/registerComponents/FormBox.jsx';
import { toast } from 'react-toastify';
import Axios from '../services/Axios.js';

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required field'),
      password: Yup.string().required('Required field'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required field'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await Axios.post('/forgot-password/reset', values);
        if (response.status === 200) {
          toast.success('Password changed successfully');
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
      formik.setFieldValue('email', email);
    }
  }, []);

  return(
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
        </div>

        <GrayBox
          title="Change Password"
          buttonText="Change Password"
          onButtonClick={formik.handleSubmit}
        >
          <FormBox
            title="Password"
            name="password"
            type="password"
            value={formik.values.password}
            change={formik.handleChange}
            blur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
          <FormBox
            title="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            change={formik.handleChange}
            blur={formik.handleBlur}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
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

export default ChangePassword;