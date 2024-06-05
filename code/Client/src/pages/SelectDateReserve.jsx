import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';


export const SelectDateReserve = () => {
    const [mincheckOut, setMincheckOut] = useState('');
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const { room_id } = useParams();
    console.log("room_id:",room_id);

    const email = window.localStorage.getItem('email');
    console.log("email: ", email.replace(/"/g, ""));

    const formik = useFormik({
        initialValues: {
            email: '',
            lastName: 'default',
            checkIn: '',
            checkOut: '',
            id_room: ''
        },
        validationSchema: Yup.object().shape({
            checkIn: Yup.string().required('Required start date'),
            checkOut: Yup.string().required('Required finish date'),
        }),
        onSubmit: async (values) => {

            // console.log("Onsubmit llamado: ", values);
            values.email = email.replace(/"/g, "");
            values.id_room = room_id;

            const formData = {
                email: values.email,
                lastName: 'default',
                checkIn: values.checkIn,
                checkOut: values.checkOut,
                id_room: values.id_room,
                status: "Outstanding"
            };

            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post('http://localhost:4000/reservations/', formData);
                navigate("/rooms/myreservations");
                console.log(response);
                toast.success('Reservation pay pending successfully');
            } catch (error) {
                console.error('Error setting reserve room:', error);
                if (error.response) {
                    // The request was made and the server responded with an error status
                    console.log('Error data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                    //alert(`Error setting reserve  room: ${error.response.data.message || 'Unspecified error'}`);
                    toast.error('Error setting reserve (response)')
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Request error:', error.request);
                    //alert('Error setting reserve : No response received from the server');
                    toast.error('Error setting reserve (request)')
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                    //alert(`Error to do reserve: ${error.message}`);
                    toast.error('Error setting reserve')
                }
            }

        }
    });

    const handlecheckInChange = (e) => {
        const selectedcheckIn = e.target.value;
        formik.setFieldValue('checkIn', selectedcheckIn);
        setMincheckOut(selectedcheckIn);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-6">
            <h1 className="mb-6 text-2xl font-bold">Select Date Reserve</h1>
            <div className="flex space-x-4">
                <div className="form-group flex flex-col items-center">
                    <label htmlFor="checkIn" className="mb-2">Start Date</label>
                    <input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        value={formik.values.checkIn}
                        onChange={handlecheckInChange}
                        onBlur={formik.handleBlur}
                        className={`border p-2 rounded ${formik.touched.checkIn && formik.errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
                        autoFocus
                    />
                    {formik.touched.checkIn && formik.errors.checkIn && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.checkIn}</div>
                    )}
                </div>
                <div className="form-group flex flex-col items-center">
                    <label htmlFor="checkOut" className="mb-2">Finish Date</label>
                    <input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        value={formik.values.checkOut}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={mincheckOut}
                        className={`border p-2 rounded ${formik.touched.checkOut && formik.errors.checkOut ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.checkOut && formik.errors.checkOut && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.checkOut}</div>
                    )}
                </div>
            </div>
                <button 
                    type="submit" 
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    // onClick={() => (navigate("/rooms/myreservations"))}
                >
                Reserve
            </button>
        </form>
    );
};

export default SelectDateReserve;
