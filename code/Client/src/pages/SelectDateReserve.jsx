import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';
import { v4 as uuidv4 } from 'uuid';
// import Axios from '../services/Axios';

const setReserve = async (formData) => {
    // const response = await Axios.post(`http://localhost:4000/reservations/`, formData);
    const response = axios.post('http://localhost:4000/reservations/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    return response.data;
}

export const SelectDateReserve = () => {
    const [minFinishDate, setMinFinishDate] = useState('');
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    console.log(token);

    const email = window.localStorage.getItem('email');
    console.log("email: ", email);
    const formik = useFormik({
        initialValues: {
            id_reserve: null,
            email: '',
            lastName: 'default',
            startDate: '',
            finishDate: ''
        },
        validationSchema: Yup.object().shape({
            startDate: Yup.string().required('Required start date'),
            finishDate: Yup.string().required('Required finish date'),
        }),
        onSubmit: async (values) => {

            console.log("Onsubmit llamado: ", values);

            const formData = new FormData();
            values.email = email;
            values.id_reserve = uuidv4();
            formData.append('email', values.email),

            formData.append('checkIn', values.startDate);
            formData.append('checkOut', values.finishDate);
            
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post('http://localhost:4000/reservations/', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                navigate("/rooms/myreservations");
                console.log(response);

            } catch (error) {
                console.error('Error setting reserve room:', error);
                if (error.response) {
                    // The request was made and the server responded with an error status
                    console.log('Error data:', error.response.data);
                    console.log('Error status:', error.response.status);
                    console.log('Error headers:', error.response.headers);
                    alert(`Error uploading room: ${error.response.data.message || 'Unspecified error'}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('Request error:', error.request);
                    alert('Error uploading room: No response received from the server');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error message:', error.message);
                    alert(`Error to do reserve: ${error.message}`);
                }
            }

        }
    });

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        formik.setFieldValue('startDate', selectedStartDate);
        setMinFinishDate(selectedStartDate);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-6">
            <h1 className="mb-6 text-2xl font-bold">Select Date Reserve</h1>
            <div className="flex space-x-4">
                <div className="form-group flex flex-col items-center">
                    <label htmlFor="startDate" className="mb-2">Start Date</label>
                    <input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formik.values.startDate}
                        onChange={handleStartDateChange}
                        onBlur={formik.handleBlur}
                        className={`border p-2 rounded ${formik.touched.startDate && formik.errors.startDate ? 'border-red-500' : 'border-gray-300'}`}
                        autoFocus
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.startDate}</div>
                    )}
                </div>
                <div className="form-group flex flex-col items-center">
                    <label htmlFor="finishDate" className="mb-2">Finish Date</label>
                    <input
                        id="finishDate"
                        name="finishDate"
                        type="date"
                        value={formik.values.finishDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        min={minFinishDate}
                        className={`border p-2 rounded ${formik.touched.finishDate && formik.errors.finishDate ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formik.touched.finishDate && formik.errors.finishDate && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.finishDate}</div>
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
