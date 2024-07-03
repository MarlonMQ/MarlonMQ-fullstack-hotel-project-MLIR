
import React, { useContext, useEffect, useState } from 'react'
import Axios from '../services/Axios';
import { AuthContext } from '../components/loginComponents/AuthContext';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SelectDate } from '../components/Reserves/SelectDate';
import SelectServices from '../components/Reserves/SelectServices';
import axios from 'axios';
import { toast } from 'react-toastify';

const getInfoAboutReservations = async (token, email) => {
    Axios.setToken(token);
    const response = await Axios.get(`/reservations/myreservations/${email}`);
    return response.data;
}


const formatDataMyRes = (dataReservations, setDataReservations) => {
    const mergedData = dataReservations.reduce((acc, item) => {
        const { title, id_service, ...rest } = item;
        const key = JSON.stringify(rest);

        if (!acc[key]) {
            acc[key] = { ...rest, titles: [title], id_services: [id_service] };
        } else {
            acc[key].titles.push(title);
            acc[key].id_services.push(id_service);
        }

        return acc;
    }, {});

    const result = Object.values(mergedData).map(item => ({
        ...item,
        title: item.titles,
        id_service: item.id_services
    }));

    console.log(result);
    setDataReservations(result);
}


const handleEditMode = (setEditMode, currentReserve, setCurrentUpdating, setRoomNumber) => {
    setEditMode( (state) => state=1 );
    setCurrentUpdating(currentReserve);
    setRoomNumber(currentReserve.num_room);
    console.log("presionada: ", currentReserve);
}

const handleDelete = async (id_reserve, id_av, token) => {
    console.log("handle delete llamado");
    const data = {
        id_reserve: id_reserve ,
        id_room_availability: id_av
    };
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const result = await axios.delete(`http://localhost:4000/reservations/deleteRes/${id_reserve}/${id_av}`);
        toast.success('Reservation deleted successfully');
        
    } catch (error) {
        console.error('Error setting reserve room:', error);
        toast.error('Cant delete reserve');
    }
} 

const MyReservations = () => {
    const email = window.localStorage.getItem('email').replace(/"/g, "");
    const [dataReservations, setDataReservations] = useState([]);
    const [editMode, setEditMode] = useState(0);
    const [currentUpdating, setCurrentUpdating] = useState({});
    const { token } = useContext(AuthContext);
    const [canPassThroughRooms, setCanPassThroughRooms] = useState(0);

    const [roomNumber, setRoomNumber] = useState(0);
    const [selectingDates, setSelectingDates] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
      const fetchReservations = async(email) => {
        const response = await getInfoAboutReservations(token, email);
        console.log("response.data", response);
        formatDataMyRes(response, setDataReservations);
      };

      fetchReservations(email);

    }, [])

    useEffect(() => {
        console.log(dataReservations);
        
    }, [dataReservations])  
    

    //! formik
    
    const formik = useFormik({
        initialValues: {
            reserveId: currentUpdating.id_reserve,
            avId: currentUpdating.id_room_availability,
            checkIn: '',
            checkOut: '',
            status: '',
            services: [],
            totalAmount: -1,
            ids_service: []
        },
        validationSchema: Yup.object().shape({
            checkIn: Yup.string().required('Required start date'),
            checkOut: Yup.string().required('Required finish date'),
        }),
        onSubmit: async (values) => {

            console.log("Onsubmit llamado: MyRes");
            values.email = email.replace(/"/g, "");
            values.id_room = currentUpdating.id_room;

            const formData = {
                reserveId: currentUpdating.id_reserve,
                avId: currentUpdating.id_room_availability,
                checkIn: values.checkIn,
                checkOut: values.checkOut,
                status: "Outstanding",
                services: formik.values.services,
                roomNumber: roomNumber,
                totalAmount: formik.values.totalAmount,
                ids_service: currentUpdating.id_services
            };
            

            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.put('http://localhost:4000/reservations/updateReservation', formData);
                toast.success('Reservation pay pending successfully');
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
    <>
        <h1 className='text-xl text-center py-6'>My Reservations</h1>
        {
            (editMode == 0)
            ? 
            <div>
                {
                    dataReservations.map( (reservation, index) => {
                        return (
                            <div key={index} className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto mb-12">
                                <div className="flex-1 p-4 text-center my-auto">
                                    <div className="bg-gray-200 p-2 rounded-tl-lg rounded-bl-lg">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{reservation.stat}</span>
                                    </div>
                                    <h2 className="text-xl font-bold mb-2">{reservation.room_type} {reservation.num_room}</h2>
                                    <h4 className="text-l font-bold mb-2">Total ${reservation.total}</h4>
                                    <p className="mb-1">To: <span className="text-gray-700">{email}</span></p>
                                    <p className="mb-4">From <span className="text-gray-700">{reservation.arrival_date}</span> to <span className="text-gray-700">{reservation.departure_date}</span></p>

                                    {
                                        (reservation.title[0]) 
                                        ?
                                            reservation.title.map( (service) => <p key={service} className='inline-block px-1'> {service} </p>)
                                        : null
                                    }
        
                                    <div className="flex space-x-2">
                                        <div className='mx-auto'>
                                            <button 
                                                className=" mr-1 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                                onClick={() => handleEditMode(setEditMode, reservation, setCurrentUpdating, setRoomNumber)}
                                            >
                                                Update
                                            </button>
        
                                            <button 
                                                className=" ml-1 bg-red-500 text-white px-4 py-2 rounded-lg"
                                                onClick={() => handleDelete(reservation.id_reserve, reservation.id_room_availability, token)}
                                            >
                                                Delete
                                            </button>
                                            {
                                                (reservation.stat == "Outstanding") 
                                                ?
                                                    <Link 
                                                        className="ml-1 bg-green-500 text-white px-8 py-2 rounded-lg"
                                                        to="/"
                                                    >
                                                        Pay
                                                    </Link>
                                                :
                                                    null
                                            }   
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-none max-w-md">
                                    <img src={reservation.image_url} alt="Room" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )
                    } )
                }
            </div>
            :

            <form onSubmit={formik.handleSubmit} className="flex flex-col items-center space-y-6">
                {
                    (selectingDates == 1) 
                    ?
                        <SelectDate
                            formik= {formik}
                            setSelectingDates = {setSelectingDates}
                            roomNumber = {roomNumber}
                            setRoomNumber={setRoomNumber}
                            totalAmount = {totalAmount}
                            setTotalAmount = {setTotalAmount}
                            room_id={currentUpdating.id_room}
                            price={currentUpdating.price_per_night}
                            canPassThroughRooms = {canPassThroughRooms}
                        />
                    :
                        <SelectServices
                            formik = {formik}
                            totalAmount = {totalAmount}
                            setTotalAmount = {setTotalAmount}
                            canPassThroughRooms = {canPassThroughRooms}

                        />

                }

            </form>
        }

    </>
  )
}

export default MyReservations;