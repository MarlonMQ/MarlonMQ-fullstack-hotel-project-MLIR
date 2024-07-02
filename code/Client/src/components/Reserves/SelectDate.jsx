import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
const calculateDaysBetweenDates = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; 
    const difference = endDate.getTime() - startDate.getTime(); 
    const numberOfDays = Math.ceil(difference / oneDay); 
    return numberOfDays+1;
}

const getDatesToRoom = async (idRoom, numRoom) => {
    const dates = await axios.get(`http://localhost:4000/rooms/consultDate/${idRoom}/${numRoom}`)
    return dates;
}

const generateDatePickerFormatToExclude = (datesFromNumberRoom) => {

    const result = datesFromNumberRoom.map( (room) => {
        console.log(room.departure_date);
        return {
            start: formatDate(addDays(room.arrival_Date, 1)),
            end: formatDate(addDays(room.departure_date, 2))

        }
    })

    return result;
}

export const SelectDate = ({formik, setSelectingDates, roomNumber, setRoomNumber, totalAmount, setTotalAmount, room_id, price, canPassThroughRooms}) => {
    const [mincheckOut, setMincheckOut] = useState('');
    const [maxNumberRoom, setMaxNumberRoom] = useState(0);
    const [maxDate, setMaxDate] = useState(addDays(new Date(), 365));
    const [excludedDates, setExcludedDates] = useState([]);


    const handleBackRoom = (roomNumber, setRoomNumber) => {
        if (roomNumber > 0) {
            setRoomNumber( (number) => number-1 );
            

        }
        formik.setFieldValue('checkIn', '');
        formik.setFieldValue('checkOut', '');
        setTotalAmount(0);
    }
    
    const handleNextRoom = (roomNumber, setRoomNumber) => {
        if (roomNumber < maxNumberRoom) {
            setRoomNumber( (number) => number+1 );

        }
        formik.setFieldValue('checkOut', '');
        formik.setFieldValue('checkIn', '');
        setTotalAmount(0);
    }


    const handlecheckInChange = (date) => {
        const dateCorrectFormat = formatDate(date);
        formik.setFieldValue('checkIn', dateCorrectFormat);

        //! Buscar la start date mas pequenia antes del anio
        let minorDate = addDays(new Date(), 365);
        const dateSelected = new Date(dateCorrectFormat);
        console.log("Dia seleccioanado: ", dateSelected.getDate()+1);

        for (let i = 0; i < excludedDates.length; i++) {
            const newMaxDate = addDays(new Date(excludedDates[i].start), 1);
            console.log("iterando", newMaxDate);
            if (newMaxDate < minorDate && newMaxDate > dateSelected) {
                minorDate = newMaxDate;
            }
            
        }
        console.log("La menor fecha es en el dia: ", formatDate(minorDate));
        setMaxDate(formatDate(minorDate));
        setMincheckOut(dateCorrectFormat);
    };

    const handleCheckOutChange = (date) => {
        const dateCorrectFormat = formatDate(date);
        formik.setFieldValue('checkOut', dateCorrectFormat);
        const In = new Date(formik.values.checkIn);
        const Out = new Date(dateCorrectFormat);
        const daysBetweenInOut = calculateDaysBetweenDates(In, Out);
        console.log(daysBetweenInOut);
        setTotalAmount(daysBetweenInOut*price);
    }


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




    return (
    <>
            <h1 className="mb-6 text-2xl font-bold">Select Date Reserve ${totalAmount}</h1>

            <div className="grid grid-cols-3 w-screen text-center">

                <div>
                    {
                        (canPassThroughRooms == 1) 
                        ?
                            <button
                                type='button'
                                className='bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded'
                                onClick={() => handleBackRoom(roomNumber, setRoomNumber)}
                            >
                                Back
                            </button>
                        : 
                        null
                    }


                </div>

                <p className='tertiary-title'>Room: {roomNumber}</p>

                <div>
                    {
                        (canPassThroughRooms == 1) 
                        ? 
                            <button 
                                type='button' 
                                className='bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded'
                                onClick={() => handleNextRoom(roomNumber, setRoomNumber)}
                            >
                                Next
                            </button>
                        :
                        null
                    }


                </div>
            </div>



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
                        maxDate={addDays(new Date(), 365)}
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
                        minDate={addDays(mincheckOut, 2)}
                        maxDate={maxDate}
                        className={`border p-2 rounded ${formik.touched.checkIn && formik.errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}

                    />
                    {formik.touched.checkOut && formik.errors.checkOut && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.checkOut}</div>
                    )}
                </div>

            </div>
            <button
                type="button"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-25"
                disabled = {(formik.values.checkIn != '' && formik.values.checkOut != '') ? false : true}
                onClick={() => setSelectingDates( (c) => c = 0 )}
            >
                Choose Services
            </button>

        </>
  )
}
