
import React, { useContext, useEffect, useState } from 'react'
import Axios from '../services/Axios';
import { AuthContext } from '../components/loginComponents/AuthContext';

const getInfoAboutReservations = async (token, email) => {
    Axios.setToken(token);
    const response = await Axios.get(`/reservations/myreservations/${email}`);
    return response.data;
}


const formatDataMyRes = (dataReservations, setDataReservations) => {
    const mergedData = dataReservations.reduce((acc, item) => {
    const { title, ...rest } = item;
    const key = JSON.stringify(rest);
    
    if (!acc[key]) {
        acc[key] = { ...rest, title: [title] };
    } else {
        acc[key].title.push(title);
    }
    
    return acc;
    }, {});
    
    const result = Object.values(mergedData);
    console.log(result);
    setDataReservations(result);
}


const MyReservations = () => {
    const email = window.localStorage.getItem('email').replace(/"/g, "");
    const [dataReservations, setDataReservations] = useState([]);
    const { token } = useContext(AuthContext);

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
    
    
  return (
    <>
        <h1>My Reservations</h1>
        {
            dataReservations.map( (reservation) => {
                return (
                    <div key={reservation.id_reserve} className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto mb-12">
                        <div className="flex-1 p-4 text-center my-auto">
                            <div className="bg-gray-200 p-2 rounded-tl-lg rounded-bl-lg">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{reservation.stat}</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2">{reservation.room_type}</h2>
                            <p className="mb-1">To: <span className="text-gray-700">{email}</span></p>
                            <p className="mb-4">From <span className="text-gray-700">{reservation.arrival_date}</span> to <span className="text-gray-700">{reservation.departure_date}</span></p>

                            {
                                reservation.title.map( (service) => <p key={service} className='inline-block px-1'> {service} </p>)
                            }

                            <div className="flex space-x-2">
                                <div className='mx-auto'>
                                    <button className=" mr-1 bg-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
                                    <button className=" ml-1 bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
                                    {
                                        (reservation.stat == "Outstanding") 
                                        ?
                                            <button className="ml-1 bg-green-500 text-white px-8 py-2 rounded-lg">Pay</button>
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
        

    </>
  )
}

export default MyReservations;
// TODO
// 1. Hacer una page aparte para elegir la fecha
// 2. Recordar que meti el email al local storage
// 3. Idea: con ese email hacer otro timer para que se le actualicen las reservas a cada
// cliente