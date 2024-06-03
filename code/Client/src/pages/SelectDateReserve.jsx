import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export const SelectDateReserve = () => {
    const [minFinishDate, setMinFinishDate] = useState('');
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            startDate: '',
            finishDate: ''
        },
        validationSchema: Yup.object().shape({
            startDate: Yup.string().required('Required start date'),
            finishDate: Yup.string().required('Required finish date'),
        }),
        onSubmit: async (values) => {
            const { startDate, finishDate } = values;
            console.log('Start Date:', startDate);
            console.log('Finish Date:', finishDate);
            // Puedes manejar la lógica de envío aquí, por ejemplo, enviar los valores a un servidor.
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
                onClick={() => (navigate("/rooms/myreservations"))}
            >
                Reserve
            </button>
        </form>
    );
};

export default SelectDateReserve;
