import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import GrayBox from '../components/registerComponents/GrayBox';
import FormBox from '../components/registerComponents/FormBox';

function SignUpPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
    }),
    onSubmit: (values) => {
      // Lógica para enviar el formulario
      console.log('Formulario enviado:', values);
    },
  });
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
        </div>

        <GrayBox
          title="Sign Up"
          buttonText="Continuar"
          hrefLink="/SignIn"
          hrefText="¿Ya tienes una cuenta? Inicia sesión"
          onButtonClick={formik.handleSubmit}
          children={
            <FormBox
              title="Correo Electrónico"
              type="email"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
          }
        >
        </GrayBox>
      </div>

      <div className="hidden sm:block sm:w-1/2 justify-center items-center">
        <img
          src={'src/assets/images/fachada.jpg'}
          alt="Imagen"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignUpPage;