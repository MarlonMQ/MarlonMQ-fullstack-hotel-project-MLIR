import React from 'react';
import PropTypes from 'prop-types';
import visaLogo from '../../assets/Payment/visan.png';
import mastercardLogo from '../../assets/Payment/mastercardn.png';
import amexLogo from '../../assets/Payment/amexnew.png';
import visaBg from '../../assets/Payment/visa-color.png';
import mastercardBg from '../../assets/Payment/master-color.png';
import amexBg from '../../assets/Payment/amex-color.png';
import defau from '../../assets/Payment/default.jpg';

const CardDisplay = ({ cardNumber, cardHolder, expiryDate }) => {
  const getCardType = (number) => {
    const firstDigit = number[0];
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    return 'Unknown';
  };

  const formatCardNumber = (number) => {
    return number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const cardType = getCardType(cardNumber);

  const getCardBgImage = (type) => {
    switch (type) {
      case 'Visa':
        return visaBg;
      case 'Mastercard':
        return mastercardBg;
      case 'American Express':
        return amexBg;
      default:
        return defau;
    }
  };

  const getCardLogo = (type) => {
    switch (type) {
      case 'Visa':
        return visaLogo;
      case 'Mastercard':
        return mastercardLogo;
      case 'American Express':
        return amexLogo;
      default:
        return null;
    }
  };

  const cardBgImage = getCardBgImage(cardType);
  const cardLogo = getCardLogo(cardType);

  return (
    <div 
      className="w-82 h-52 rounded-lg shadow-lg p-6 text-white relative border-4" 
      style={{
        backgroundImage: `url(${cardBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '400px',  // tamaño fijo de ancho
        height: '220px', // tamaño fijo de alto
        rounded: 'lg',
      }}
    >
      {cardLogo && <img src={cardLogo} alt="Card logo" className="absolute top-4 right-4 w-12 h-8" />}
      <div className="text-xs">Card Number</div>
      <div className="text-xl font-mono mt-1 tracking-widest">{formatCardNumber(cardNumber)}</div>
      <div className="flex justify-between mt-4">
        <div>
          <div className="text-xs">Card Holder</div>
          <div className="text-lg">{cardHolder}</div>
        </div>
        <div>
          <div className="text-xs">Good Thru</div>
          <div className="text-lg">{expiryDate}</div>
        </div>
      </div>
    </div>
  );
};

CardDisplay.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  cardHolder: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
};

export default CardDisplay;



