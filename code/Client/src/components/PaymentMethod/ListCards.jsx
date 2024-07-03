import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import visaLogo from '../../assets/Payment/visan.png';
import mastercardLogo from '../../assets/Payment/mastercardn.png';
import amexLogo from '../../assets/Payment/amexn.png';


const CardList = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const userEmail = window.localStorage.getItem('email').replace(/"/g, "");
        const response = await axios.get(`http://localhost:4000/payment/cardsUser/${userEmail}`);
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber[0];
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    return 'Unknown';
  };

  const getCardLogo = (cardType) => {
    switch (cardType) {
      case 'Visa':
        return visaLogo;
      case 'Mastercard':
        return mastercardLogo;
      case 'American Express':
        return amexLogo;
      default:
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4 px-12">Payment methods</h2>
      <ul>
        {cards.map((card, index) => (
          <li key={index} className="mb-4 px-12 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <img src={getCardLogo(getCardType(card.cardNumber))} alt="Card logo" className="w-12 h-8 mr-4" />
              <span>{getCardType(card.cardNumber)} ****{card.cardNumber.slice(-4)}</span>
              <button onClick={() => navigate(`/cardDetails/${card.id}`)} className="ml-auto text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardList;
