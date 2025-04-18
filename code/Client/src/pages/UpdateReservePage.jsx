import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SelectDate } from '../components/Reserves/SelectDate';
import SelectServices from '../components/Reserves/SelectServices';

export const UpdateReservePage = () => {
    const {reserveId, avId} = useParams();

    const [roomNumber, setRoomNumber] = useState(0);
    const [selectingDates, setSelectingDates] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);

    const formik = useFormik({
        initialValues: {
            reserveId: reserveId,
            avId: avId,
            checkIn: '',
            checkOut: '',
            status: '',
            services: [],
            totalAmount: -1
        },
        validationSchema: Yup.object().shape({
            checkIn: Yup.string().required('Required start date'),
            checkOut: Yup.string().required('Required finish date'),
        }),
        onSubmit: async (values) => {

            console.log("Onsubmit llamado: ");
            values.email = email.replace(/"/g, "");
            values.id_room = room_id;

            const formData = {
                reserveId: reserveId,
                avId: avId,
                checkIn: values.checkIn,
                checkOut: values.checkOut,
                status: "Outstanding",
                services: formik.values.services,
                totalAmount: formik.values.totalAmount,
            
            };
            

            try {
                // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // const response = await axios.post('http://localhost:4000/reservations/', formData);
                // toast.success('Reservation pay pending successfully');
                // navigate("/rooms/myreservations");
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


    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-6">
        {
            (selectingDates === 1) 
                ?
                    <SelectDate 
                        formik= {formik}
                        setSelectingDates = {setSelectingDates}
                        roomNumber = {roomNumber}
                        setRoomNumber={setRoomNumber}
                        totalAmount = {totalAmount}
                        setTotalAmount = {setTotalAmount}

                    />
                :
                    <SelectServices
                        formik = {formik}
                        totalAmount = {totalAmount}
                        setTotalAmount = {setTotalAmount}
                    />

                
        }

    </form>
    )
}
