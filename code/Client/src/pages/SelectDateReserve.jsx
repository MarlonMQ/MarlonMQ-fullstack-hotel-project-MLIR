import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../components/loginComponents/AuthContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';
import { addDays } from 'date-fns';


const calculateDaysBetweenDates = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; 
    const difference = endDate.getTime() - startDate.getTime(); 
    const numberOfDays = Math.ceil(difference / oneDay); 
    return numberOfDays;
}


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

const generateDatePickerFormatToExclude = (datesFromNumberRoom) => {
    
    const result = datesFromNumberRoom.map( (room) => {
        return {
            start: room.arrival_Date,
            end: addDays(room.departure_date, 1)
        }
    })

    return result;
}

const getDatesToRoom = async (idRoom, numRoom) => {
    const dates = await axios.get(`http://localhost:4000/rooms/consultDate/${idRoom}/${numRoom}`)
    return dates;
}

const formatDate = (date) => {
    const selectedDate = new Date(date)
    let oneDigitMonth = true;
    if (parseInt(selectedDate.getMonth()+1) >= 10) {
        oneDigitMonth = false;
    }

    let oneDigitDay = true;
    if (selectedDate.getDate() >= 10) {
        oneDigitDay = false;
    }
    return selectedDate.getFullYear() + "-" + (oneDigitMonth == true ? "0" : "") + parseInt(selectedDate.getMonth()+1) +"-"+ (oneDigitDay == true ? "0" : "") + selectedDate.getDate();

}



export const SelectDateReserve = () => {
    const [mincheckOut, setMincheckOut] = useState('');
    const [excludedDates, setExcludedDates] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [roomNumber, setRoomNumber] = useState(0);
    const [maxNumberRoom, setMaxNumberRoom] = useState(0);
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const { room_id } = useParams();

    useEffect(() => {
        const getDates = async() => {
            const dates = await getDatesToRoom(room_id, roomNumber);
            console.log("Dates: ", dates);
            const excludedDatesToRoom = generateDatePickerFormatToExclude(dates.data);
            console.log(excludedDatesToRoom);
            setExcludedDates(excludedDatesToRoom);
        }
        getDates();
    }, [roomNumber])

    useEffect(() => {
        const getMaxNumRoom = async() => {
            const result = await axios.get(`http://localhost:4000/rooms/consultDate/${room_id}`);
            setMaxNumberRoom(result.data[0].num_room);
            return result;
        }
        getMaxNumRoom();
    }, [])
    
    
    //! Temporal
    useEffect(() => {
        const date = formatDate(startDate);
        console.log("date selected: ", date);
    }, [startDate])
    


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

            console.log("Onsubmit llamado: ");
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

                
                // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                // const response = await axios.post('http://localhost:4000/reservations/', formData);
                // navigate("/rooms/myreservations");
                // toast.success('Reservation pay pending successfully');
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

    const handlecheckInChange = (date) => {
        const dateCorrectFormat = formatDate(date);
        formik.setFieldValue('checkIn', dateCorrectFormat);
        setMincheckOut(dateCorrectFormat);
    };

    const handleCheckOutChange = (date) => {
        const dateCorrectFormat = formatDate(date);
        formik.setFieldValue('checkOut', dateCorrectFormat);
    }

    const handleBackRoom = (roomNumber, setRoomNumber) => {
        if (roomNumber > 0) {
            setRoomNumber( (number) => number-1 );
            

        }
        formik.setFieldValue('checkIn', '');
        formik.setFieldValue('checkOut', '');
    }
    
    const handleNextRoom = (roomNumber, setRoomNumber) => {
        if (roomNumber < maxNumberRoom) {
            setRoomNumber( (number) => number+1 );

        }
        formik.setFieldValue('checkOut', '');
        formik.setFieldValue('checkIn', '');
    }

    return (
    <>
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-6">
            <h1 className="mb-6 text-2xl font-bold">Select Date Reserve</h1>

            <button
                type='button' 
                onClick={() => handleBackRoom(roomNumber, setRoomNumber)}
            >
                Back
            </button>

            <p>{roomNumber}</p>

            <button 
                type='button' 
                onClick={() => handleNextRoom(roomNumber, setRoomNumber)}
            >
                Next
            </button>


            <div className="flex space-x-4">
                <div className="form-group flex flex-col items-center">
                    <label htmlFor="checkIn" className="mb-2">Start Date</label>
                    <DatePicker
                        id="checkIn"
                        name="checkIn"
                        value={formik.values.checkIn}
                        onChange={handlecheckInChange}
                        onBlur={formik.handleBlur}
                        excludeDateIntervals={excludedDates}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="yyyy/mm/dd"
                        className={`border p-2 rounded ${formik.touched.checkIn && formik.errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
                        autoFocus
                    />
                    {formik.touched.checkIn && formik.errors.checkIn && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.checkIn}</div>
                    )}
                </div>
                <div className="form-group flex flex-col items-center">
                    <label htmlFor="checkOut" className="mb-2">Finish Date</label>
                    <DatePicker
                        id="checkOut"
                        name="checkOut"
                        value={formik.values.checkOut}
                        onChange={handleCheckOutChange}
                        excludeDateIntervals={excludedDates}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="yyyy/mm/dd"
                        className={`border p-2 rounded ${formik.touched.checkIn && formik.errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}

                    />
                    {formik.touched.checkOut && formik.errors.checkOut && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.checkOut}</div>
                    )}
                </div>

            </div>
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => {console.log("presionado")}}
                >
                    Reserve
                </button>

        </form>
        {/* <DatePicker
            id="checkOut"
            name="checkOut"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            excludeDateIntervals={excludedDates}
            dateFormat="yyyy/MM/dd"
            placeholderText="yyyy/mm/dd"
        /> */}
    </>

    );
};

export default SelectDateReserve;
