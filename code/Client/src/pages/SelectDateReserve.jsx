import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';

import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import { addDays } from 'date-fns';

import { SelectDate } from '../components/Reserves/SelectDate';
import SelectServices from '../components/Reserves/SelectServices';



const howManyRooms = (roomsDates) => {
    // Calcula la cantidad de habitaciones diferentes a partir de las reservaciones
    let maxNumOfRooms = 0;
    for (let index = 0; index < roomsDates.length; index++) {
        if(roomsDates[index].num_room > maxNumOfRooms) {
            maxNumOfRooms = roomsDates[index].num_room;
        }
    }
    console.log("Max num of different rooms" , maxNumOfRooms);
    return maxNumOfRooms;
}





export const SelectDateReserve = () => {
    const [roomNumber, setRoomNumber] = useState(0);

    const [selectingDates, setSelectingDates] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);

    const { token } = useContext(AuthContext);
    const { room_id } = useParams();
    const navigate = useNavigate();

    const email = window.localStorage.getItem('email');
    console.log("email: ", email.replace(/"/g, ""));

    const formik = useFormik({
        initialValues: {
            email: '',
            lastName: 'default',
            checkIn: '',
            checkOut: '',
            id_room: '',
            services: [],
            roomNumber: -1
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
                email: values.email,
                lastName: 'default',
                checkIn: values.checkIn,
                checkOut: values.checkOut,
                id_room: values.id_room,
                status: "Outstanding",
                services: formik.values.services,
                roomNumber: roomNumber
            };
            


            try {
                //! Subir todo lo relacionado a la reserva a la bd
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post('http://localhost:4000/reservations/', formData);
                toast.success('Reservation pay pending successfully');
                navigate("/rooms/myreservations");
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

    );
};

export default SelectDateReserve;
