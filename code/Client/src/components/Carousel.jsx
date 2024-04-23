import React from 'react'
import { Carousel } from 'antd';

export const CarouselComponent = () => {
  return (
    <>
      <div className='relative'>

        <Carousel autoplay>
              <div>

                <div className='hidden sm:block'>
                  <img className='brightness-50' src="../src/assets/hotelPictures/Hotel-image01.jpg" alt="hotel image 01" />
                </div>

                <div className="block sm:hidden">
                  <img className='brightness-50 h-screen' src="../src/assets/hotelPictures/Hotel-image05.jpg" alt="hotel image 01" />
                </div>

              </div>

              <div>

                <div className='hidden sm:block'>
                  <img className='brightness-50' src="../src/assets/hotelPictures/Hotel-image02.jpg" alt="hotel image 02" />
                </div>

                <div className="block sm:hidden">
                  <img className='brightness-50 h-screen' src="../src/assets/hotelPictures/Hotel-image06.jpg" alt="hotel image 01" />
                </div>

              </div>

              <div>
                <div className='hidden sm:block'>
                  <img className='brightness-50' src="../src/assets/hotelPictures/Hotel-image03.jpg" alt="hotel image 03" />
                  
                </div>

                <div className="block sm:hidden">
                  <img className='brightness-50 h-screen' src="../src/assets/hotelPictures/Hotel-image07.jpg" alt="hotel image 01" />
                </div>

              </div>
        </Carousel>

        <div className='absolute inset-y-1/3 left-20 mt-2'>
          <h2 className='secondary-title text-white mb-2'>WELCOME TO</h2>
          <h1 className='primary-title primary-title-mobile text-white mb-2'>HAZBIN</h1>
          <h2 className='secondary-title text-white mb-2'>HOTEL</h2>
          <p className=' primary-text text-white mb-3'>One of the best hotels in this country!</p>
          <button className='primary-text text-white bg-third py-2 px-14 mt-3 rounded-lg hover:bg-secondary'>RESERVE NOW</button>
        </div>
      </div>
    </>
  )
}
