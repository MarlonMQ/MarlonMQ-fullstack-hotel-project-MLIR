import React from 'react'
import { Carousel } from 'antd';

export const CarouselComponent = () => {
  return (
    <>
      <div className='relative'>

        <Carousel autoplay>
              <div>
                <img className='brightness-50' src="../src/assets/hotelPictures/Hotel-image01.jpg" alt="hotel image 01" />
              </div>

              <div>
                <img className='brightness-50' src="../src/assets/hotelPictures/Hotel-image02.jpg" alt="hotel image 02" />
              </div>

              <div>
                <img className='brightness-50' src="../src/assets/hotelPictures/Hotel-image03.jpg" alt="hotel image 03" />
              </div>
        </Carousel>

        <div className='absolute inset-y-1/3 left-20 mt-2'>
          <h2 className='sm:secondary-title secondary-title-mobile  text-white sm:mb-2'>WELCOME TO</h2>
          <h1 className='sm:primary-title primary-title-mobile text-white sm:mb-2'>HAZBIN</h1>
          <h2 className='sm:secondary-title secondary-title-mobile text-white sm:mb-2'>HOTEL</h2>
          <p className=' text-xs sm:primary-text text-white sm:mb-3'>One of the best hotels in this country!</p>
          <button className='text-xs sm:primary-text text-white bg-third sm:py-2 py-1 sm:px-14 px-5 mt-3 rounded-lg hover:bg-secondary'>RESERVE NOW</button>
        </div>
      </div>
    </>
  )
}
