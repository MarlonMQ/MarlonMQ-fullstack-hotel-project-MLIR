import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';
import GrayBox from '../components/registerComponents/GrayBox';
import FormBox from '../components/registerComponents/FormBox.jsx';
import Axios from '../services/Axios.js';

function LoginPage()  {

  const { login } = useContext(AuthContext); // Obtén la función login del contexto de autenticación

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
      password: Yup.string().required('Contraseña requerida'),
    }),
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await Axios.post('/login', values);
        if (response.status === 200) {
          const token = response.data.token;
          login(token);
          window.location.href = '/';
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrors({ password: 'Correo o contraseña equivocadas.' });
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
          title="Sign In"
          buttonText="Iniciar Sesión"
          hrefLink="/SignUp"
          hrefText="¿No tienes una cuenta? Regístrate"
          onButtonClick={formik.handleSubmit}
          >
            <FormBox
              title="Correo Electrónico"
              name="email"
              type="email"
              value={formik.values.email}
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
            <FormBox
              title="Contraseña"
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
            alt="Imagen"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
  );
}

export default LoginPage;