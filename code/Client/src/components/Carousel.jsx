import React from 'react'
import { Carousel } from 'antd';

export const CarouselComponent = () => {
  return (
    <>
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
    
    </>
  )
}
