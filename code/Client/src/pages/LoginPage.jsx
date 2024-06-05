import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext.jsx';
import GrayBox from '../components/registerComponents/GrayBox.jsx';
import FormBox from '../components/registerComponents/FormBox.jsx';
import Axios from '../services/Axios.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginPage()  {

  const { login } = useContext(AuthContext); // Get the login function from the authentication context
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required field'),
      password: Yup.string().required('Password required'),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await Axios.post('/login', values);
        if (response.status === 200) {
          //! cambio
          window.localStorage.setItem('email', JSON.stringify(values.email));

          const token = response.data.token;
          const rol = response.data.rol;
          login(token,rol);
          Axios.setToken(token);
          navigate('/'); // Navega a la página principal
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrors({ password: 'Incorrect email or password.' });
        } else {
          console.error(error);
        }
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
          title="Log In"
          buttonText="Log In"
          hrefLink="/SignUp"
          hrefText="Don't have an account? Sign Up"
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
            <FormBox
              title="Password"
              name="password"
              type="password"
              value={formik.values.password}
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
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
}

export default LoginPage;