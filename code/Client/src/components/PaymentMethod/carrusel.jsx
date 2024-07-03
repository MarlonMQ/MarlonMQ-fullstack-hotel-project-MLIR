import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import CardDisplay from './CardDisplay';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardCarousel = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Obtener la información de las tarjetas del backend
    axios.get('http://localhost:4000/payment/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false, // Evitar la repetición infinita
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full mb-16">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="flex justify-center">
            <CardDisplay 
              cardNumber={card.cardNumber} 
              cardHolder={card.cardHolder} 
              expiryDate={card.expiryDate} 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardCarousel;
