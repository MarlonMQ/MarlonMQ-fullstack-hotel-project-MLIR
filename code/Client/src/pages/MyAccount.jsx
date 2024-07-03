import React, { useState, useEffect, useContext } from 'react';
import Axios from '../services/Axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';
import FormBox from '../components/MyAccount/FormBox'; 
import CountryRegionSelector from '../components/MyAccount/CountryRegionSelector';
import ChangePhoto from '../components/MyAccount/ChangePhoto';
import ChangePassword from '../components/MyAccount/ChangePassword';
import DeleteAccount from '../components/MyAccount/DeleteAccount';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';

function MyAccount() {
  const navigate = useNavigate();
  const {rol, token, updateProfileImage, logout } = useContext(AuthContext);
  const [base64Image, setBase64Image] = useState('');
  const [account, setAccount] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [showChangePhoto, setShowChangePhoto] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];;
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      const buffer = Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const bufferImage = {
        type: 'Buffer',
        data: Array.from(buffer)
      };
      setBase64Image(base64String);
      formik.setFieldValue('profile_image', bufferImage);
    };
    setShowChangePhoto(false)
  };

  const fetchAccount = async () => {
    try {
      Axios.setToken(token);
      const response = await Axios.get('/myAccount');
      if (response.status === 200) {
        setAccount(response.data);     
        if (response.data.profile_image) {
          const base64String = btoa(
            new Uint8Array(response.data.profile_image.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          setBase64Image(`data:image/jpeg;base64,${base64String}`);
        }
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
      profile_image: '',
      password: '121',
      newPassword: '12qwW12',
      confirmPassword: '12qwW12',
      changingPassword: 0,
    },
    validationSchema: Yup.object().shape({

      password: Yup.string().required('Required field'),
      newPassword: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .max(20, 'Password cannot be longer than 20 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Required field'),
    
      confirmPassword: Yup.string().oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match').required('Required field'),
    
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

    onSubmit: async (values) => {
      const response = await Axios.post('/myAccount', values);
      setEditMode(false);
      fetchAccount();
      if (response.status === 201) {
        toast.success('Account updated successfully');
      }
      try {
      } catch (error) {
        // handle errors
      }
      return 0;
    },
  });

  const birthDate = new Date(account.birth_date).toLocaleDateString('en-CA');


  const handleEditMode = () => {
    fetchAccount();
    if (account) {
      formik.setValues({
        email: account.email,
        name: account.name,
        lastName: account.last_name,
        birthDate: birthDate,
        phone: account.phone_number,
        country: account.country,
        region: account.region,
        address: account.address,
        profile_image: account.profile_image,
        password: '121',
        newPassword: '12qwW12',
        confirmPassword: '12qwW12',
      });
      setCountry(account.country);
      setRegion(account.region);
    }
    setEditMode(true);
  };

  const handleSaveInformation = async () => {
    console.log(formik.values);
    updateProfileImage(formik.values.profile_image);
    formik.handleSubmit();
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

  const handleChangePhoto = () => {
    setShowChangePhoto(true);
  }

  const handleDeletePhoto = () => {
    setBase64Image('');
    formik.setFieldValue('profile_image', '');
    setShowChangePhoto(false);
  }
  const handleOpenChangePassword = () => {
    formik.setValues({
      password: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowChangePassword(true);
  }

  const handleChangePassword = async () => {
    if (
      formik.values.password !== '' &&
      formik.values.newPassword !== '' &&
      formik.values.confirmPassword !== '' &&
      formik.values.newPassword === formik.values.confirmPassword
    ) {
      const values = {
        email: account.email,
        password: formik.values.password,
        newPassword: formik.values.newPassword,
        changingPassword: 1,
      };

      try {
        const response = await Axios.post('/myAccount', values);
        console.log(response.status);
          setShowChangePassword(false);
          formik.resetForm(); // Utiliza resetForm para resetear los valores y el estado de touched
          toast.success('Password changed successfully');
          formik.setValues({
            password: '121',
              newPassword: '12qwW12',
              confirmPassword: '12qwW12',
          });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('Wrong password, please try again');
          formik.setErrors({ password: 'Wrong password' });
        } else {
          console.error(error);
        }
      }
    }
  };

  const closeChangePassword = () => {
    setShowChangePassword(false);
    setShowDeleteAccount(false);
    formik.resetForm();
  }

  const handleOpenDeleteAccount = () => {
    formik.setValues({
      password: '',
    });
    setShowDeleteAccount(true);
  }

  const handleDeleteAccount = async () => {
    if (formik.values.password !== '') {
      console.log('Deleting account');
      const values = {
        email: account.email,
        password: formik.values.password,
        changingPassword: 2,
      }
      try {

        const response = await Axios.post('/myAccount', values);
  
        if (response.status === 202) {
          toast.info('your account has been deleted');
          logout();
          navigate('/');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('Wrong password, please try again');
          formik.setErrors({ password: 'Wrong password' });
        } else {
          if(error.response){
            console.log(error.response.data);
          }
          console.error(error);
        }
      }
    }
  };


  return (
    <div className="flex flex-col sm:flex-row h-full w-full bg-gray-100 pt-5">
      <div className="w-full mb-20 sm:w-4/6  bg-white p-14 mx-auto my-auto shadow-lg rounded-lg flex flex-col">
        
        <div className='flex sm:flex-row flex-col items-start space-y-8 sm:space-y-0'>
          <div className='w-1/2 items-center sm:items-start flex flex-col space-y-5'>
            <h1 className="text-4xl font-bold text-fourth mb-8">My Account</h1>
            {editMode ? (        
              <div className='relative size-80 flex group items-center justify-center'>
              {base64Image ?
                (<div className='flex items-center justify-center cursor-pointer' onClick={handleChangePhoto}>
                  <img src={base64Image} className='object-cover rounded-full absolute w-full h-full group-hover:opacity-75 transition-all duration-300 ease-in-out' />
                  <div className='absolute w-3/6 h-3/6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-center text-2xl font-semibold'>
                    Change profile image
                  </div>
                </div>)
                :
                (<div className='flex items-center justify-center cursor-pointer' onClick={() => document.getElementById('profile_image_input').click()}>
                  <img src="src/assets/images/no_profile_image.png" className='absolute w-full h-full group-hover:opacity-75 transition-all duration-300 ease-in-out' />
                  <img src="src/assets/images/add_profile_image.png" className='absolute w-3/6 h-3/6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out' />
                </div>)
              }
              <input type="file" id="profile_image_input" onChange={handleFileChange} className="hidden" />
            </div>
            ) : (
              <div className='relative size-80 flex items-center justify-center'>
                {base64Image ?
                  (
                  <img src={base64Image} className='object-cover rounded-full absolute w-full h-full' />
                  ):(
                  <img src="src/assets/images/no_profile_image.png" className='absolute w-full h-full' />
                  )
                }
              </div>
              )
            }
          </div>    
          {editMode ? (
              <div className="w-1/2 space-y-0">
                <div className="px-2 w-full sm:w-full">
                    <FormBox 
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
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
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
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
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
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
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
                  <div className="px-2 w-full sm:w-full">
                    <CountryRegionSelector 
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
                  <div className="px-2 w-full sm:w-full">
                    <FormBox 
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
              </div>
                
            ) : ( 
              <div className=" w-1/2 space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Email:</h2>
                  <p className="text-gray-600">{account.email}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Name:</h2>
                  <p className="text-gray-600">{account.name} {account.last_name}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Phone Number:</h2>
                  <p className="text-gray-600">{account.phone_number}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Birth Date:</h2>
                  <p className="text-gray-600">{birthDate}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Country:</h2>
                  <p className="text-gray-600">{account.country}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">City:</h2>
                  <p className="text-gray-600">{account.region}</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">Address:</h2>
                  <p className="text-gray-600">{account.address}</p>
                </div>
              </div>
            )
            }
        </div>
        <div className='flex flex-row space-x-2 mt-7 '>
          {!editMode && (
            <div className='w-full flex flex-row justify-between '>
              <button className="w-1/2 mx-auto mt-8 text-start text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg" onClick={handleOpenChangePassword}>
                Change your password
              </button>
              <button className="w-1/2 mx-auto mt-8 text-start text-blue-500 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg" onClick={handleEditMode}>
                Edit your information
              </button>
              {rol !== 'admin' &&
                <button className="w-1/2 mx-auto mt-8 ml-14 text-end text-red-500 hover:text-red-700 font-semibold py-2 px-4 rounded-lg" onClick={handleOpenDeleteAccount}>
                  Delete your account
                </button>
              }
            </div>
          )}
          {editMode && (
            <button className="w-1/2 mx-auto mt-8 bg-red-400 text-white font-semibold py-2 px-4 rounded-lg" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          )}
          {editMode && (
            <button className="w-1/2 mx-auto mt-8 bg-green-400 text-white font-semibold py-2 px-4 rounded-lg" onClick={handleSaveInformation}>
              Save you information
            </button>
          )}
        </div>
        
      </div>
      {showChangePhoto && (
        <ChangePhoto
            onUploadPhoto={() => document.getElementById('profile_image_input').click()}
            onDeletePhoto={handleDeletePhoto}
            onClose={() => setShowChangePhoto(false)}
        />
      )}
      {showChangePassword && (
        <ChangePassword
            onConfirm={handleChangePassword}
            onClose={closeChangePassword}
            handleChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
        />
      )}
      {showDeleteAccount && (
        <DeleteAccount
            onConfirm={handleDeleteAccount}
            onClose={closeChangePassword}
            handleChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            handleBlur={formik.handleBlur}
            touched={formik.touched}
        />
      )}
    </div>
  );
}

export default MyAccount;

