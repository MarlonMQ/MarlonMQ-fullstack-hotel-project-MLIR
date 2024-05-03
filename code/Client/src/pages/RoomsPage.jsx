import React from 'react'

const RoomsPage = () => {
  return (
    <>

    <div className="grid grid-cols-3 gap-4 p-4">



        {/* Elemento individual, para 3 columnas */}
        <div className='rounded-md border-2 border-secondary'>
            <div className='rounded-md border-2'>
                <img src="../src/assets/logo/hazbin-logo.jpg" alt="" srcset="" />
            </div>
            <div className='bg-primary py-2 text-white text-center Roboto'>
                <h2>SINGLE ROOMS</h2>
            </div>
            <div className='flex justify-between px-12 py-4'>
                <div className='flex cursor-pointer'>
                    {/* bg-yellow-400 rounded-full */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 "> 
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <button className='primary-text text-secondary'> View Room Details </button>
                </div>

                <p className='primary-text text-secondary'>15$</p>

            </div>

            <p className="primary-text text-secondary text-center">Availables: 5</p>
            {/* <button className=' m-1 px-2 py-1 bg-red-800 text-white rounded-md'>Eliminar</button> */}
        </div>



    </div>


    </>
  )
}

export default RoomsPage;