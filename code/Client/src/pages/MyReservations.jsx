import React from 'react'


const MyReservations = () => {
    const email = window.localStorage.getItem('email');

  return (
    <>
        <h1>My Reservations</h1>
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div className="flex-1 p-4 text-center my-auto">
                <div className="bg-gray-200 p-2 rounded-tl-lg rounded-bl-lg">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">pending payment</span>
                </div>
                <h2 className="text-xl font-bold mb-2">DOUBLE ROOM</h2>
                <p className="mb-1">To: <span className="text-gray-700">{email}</span></p>
                <p className="mb-4">From <span className="text-gray-700">[date]</span> to <span className="text-gray-700">[date]</span></p>
                <div className="flex space-x-2">
                    <div className='mx-auto'>
                        <button className=" mr-1 bg-blue-500 text-white px-4 py-2 rounded-lg">Modificar</button>
                        <button className=" ml-1 bg-red-500 text-white px-4 py-2 rounded-lg">Eliminar</button>
                    </div>
                </div>
            </div>
            <div className="flex-none max-w-md">
                <img src="https://via.placeholder.com/400" alt="Room" className="w-full h-full object-cover" />
            </div>
        </div>

    </>
  )
}

export default MyReservations;
// TODO
// 1. Hacer una page aparte para elegir la fecha
// 2. Recordar que meti el email al local storage
// 3. Idea: con ese email hacer otro timer para que se le actualicen las reservas a cada
// cliente