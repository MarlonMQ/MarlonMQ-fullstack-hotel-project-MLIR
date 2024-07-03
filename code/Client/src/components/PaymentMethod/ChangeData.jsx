import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import visaLogo from '../../assets/Payment/logo-visa-2.png';
import mastercardLogo from '../../assets/Payment/mastercardn.png';
import amexLogo from '../../assets/Payment/amexn.png';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const ChangeData = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/payment/cardID/${cardId}`);
        setCard(response.data);
        setCvv(response.data.cvv);
        setExpiryDate(response.data.expiryDate);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCard();
  }, [cardId]);

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
        return null;
    }
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const confirmSave = async () => {
    setIsModalOpen(false);
    try {
      await axios.put(`http://localhost:4000/payment/editCard/${cardId}`, {
        cvv,
        expiryDate
      });
      toast.success('Card updated successfully');
      navigate('/cards');
    } catch (error) {
      console.error('Error updating card:', error);
      toast.error('Error updating card');
    }
  };

  const handleCancel = () => {
    navigate('/cards');
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Edit credit card</h2>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <img src={getCardLogo(getCardType(card.cardNumber))} alt="Card logo" className="w-12 h-8 mr-4" />
          <span className="text-gray-600">**** **** **** {card.cardNumber.slice(-4)}</span>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Due date vto.</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={handleCancel}
        >
          CANCEL
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={handleSave}
        >
          SAVE
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Edit"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Confirm Edit</h2>
          <p>You´re about to edit your card data, are you sure?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={confirmSave}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeData;

