import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import GrayBox from '../components/registerComponents/GrayBox';
import FormBox from '../components/registerComponents/FormBox';
import CountryRegionSelector from '../components/registerComponents/CountryRegionSelector';

function SignUpPage() {
  const [window, setWindow] = useState(0); // Estado para controlar la visibilidad del primer FormBox
  
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
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Correo electrónico inválido').required('Campo requerido'),
      password: Yup.string().required('Campo requerido'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Campo requerido'),
      name: Yup.string().required('Campo requerido'),
      lastName: Yup.string().required('Campo requerido'),
      birthDate: Yup.string().required('Campo requerido'),
      phone: Yup.string().required('Campo requerido'),
      country: Yup.string().required('Campo requerido'),
      region: Yup.string().required('Campo requerido'),
      address: Yup.string().required('Campo requerido'),
    }),
    onSubmit: (values) => {
      // Lógica para enviar el formulario
      console.log('Formulario enviado:', values);
    },
  });
  const handleButtonClick = () => { 
    formik.handleSubmit();
    if (window == 0 && !formik.errors.email && !formik.errors.password && !formik.errors.confirmPassword){
      if(formik.values.email != '' && formik.values.password != '' && formik.values.confirmPassword != ''){
        formik.setTouched({}, false);
        setWindow(1); // Mostrar el segundo FormBox solo si no hay errores en el primer formulario
      }
    } else if (window == 1 && !formik.errors.name && !formik.errors.lastName && !formik.errors.birthDate && !formik.errors.phone ) {
      formik.setTouched({}, false);
      setWindow(2); // Mostrar el tercer FormBox solo si no hay errores en el segundo formulario
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
          buttonText="Continuar"
          hrefLink="/SignIn"
          hrefText="¿Ya tienes una cuenta? Inicia sesión"
          onButtonClick={handleButtonClick}
        >

          {window == 0 && (
            <>
          <FormBox
              title="Correo Electrónico"
              name="email"
              type="email"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
          />
          <FormBox
              title="Contraseña"
              name="password"
              type="password"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
          />
          <FormBox
              title="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          </>
        )}
        {window == 1 && (
          <>
          <FormBox
              title="Nombre"
              name="name"
              type="text"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
          />
          <FormBox
              title="Apellidos"
              name="lastName"
              type="text"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.lastName && formik.errors.lastName}
          />
          <FormBox
              title="Fecha de Nacimiento"
              name="birthDate"
              type="date"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.birthDate && formik.errors.birthDate}
          />
          <FormBox
              title="Teléfono"
              name="phone"
              type="tel"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.phone && formik.errors.phone}
          />
          </>
        )}
        {window == 2 && (
          <>
          <CountryRegionSelector
            country = {country}
            selectCountry = {selectCountry}
            region = {region}
            selectRegion ={selectRegion}
            countryError={formik.touched.country && formik.errors.country}
            regionError={formik.touched.region && formik.errors.region}
          />
          <FormBox
              title="Dirección"
              name="address"
              type="text"
              change={formik.handleChange}
              blur={formik.handleBlur}
              error={formik.touched.address && formik.errors.address} 
          />
          </>
        )}
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