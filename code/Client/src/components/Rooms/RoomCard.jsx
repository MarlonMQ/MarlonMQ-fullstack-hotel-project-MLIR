import React from 'react'
import { Link } from 'react-router-dom';

export const RoomCard = ({data}) => {
    // console.log("data in room card", data);
    const {room_type, price_per_night, quantity_available, id_room, image_url} = data;

    

  return ( 
    <>
        <div className={`rounded-md border-2 border-secondary ${quantity_available === 0 ? 'pointer-events-none opacity-50' : ''}`}>
            <div className='rounded-md border-2'>
                <img src={image_url} alt="Image description"/>
            </div>
            <div className='bg-primary py-2 text-white text-center Roboto'>
                <h2>{room_type} Room</h2>
            </div>
            <div className='flex justify-between px-12 py-4'>
                <div className='flex cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <Link className='primary-text text-secondary' to={`/rooms/moreInfo/${id_room}`}>
                        View Room Details
                    </Link>
                </div>
                <p className='primary-text text-secondary'>{`${price_per_night}$`}</p>
            </div>
            <p className="primary-text text-secondary text-center">Total rooms: {`${quantity_available}`}</p>
        </div>

    </>
  )
}
