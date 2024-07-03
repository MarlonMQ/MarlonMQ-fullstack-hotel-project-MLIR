import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import visaLogo from '../../assets/Payment/logo-visa-2.png';
import mastercardLogo from '../../assets/Payment/mastercardn.png';
import amexLogo from '../../assets/Payment/amexn.png';
import editIcon from '../../assets/Payment/editar.png';  
import deleteIcon from '../../assets/Payment/eliminar.png';  
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const CardDetails = () => {
  const { cardId } = useParams();
  const [card, setCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/payment/cardID/${cardId}`);
        setCard(response.data);
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

  const handleDelete = () => {
    setIsModalOpen(true); // Mostrar el modal cuando se hace clic en eliminar
  };

  const confirmDelete = async () => {
    setIsModalOpen(false); // Cerrar el modal
    try {
      await axios.delete(`http://localhost:4000/payment/deleteCard/${cardId}`);
      toast.success('Card deleted successfully');
      navigate('/cards');
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Error deleting card');
    }
  };

  const handleEdit = () => {
    navigate(`/edit-card/${cardId}`);
  };

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{getCardType(card.cardNumber)} ****{card.cardNumber.slice(-4)}</h2>
        <img src={getCardLogo(getCardType(card.cardNumber))} alt="Card logo" className="w-12 h-8 " />
      </div>
      <p className="mb-8">Due date: {card.expiryDate}</p>
      <button className="text-blue-500 flex items-center mb-8" onClick={handleEdit}>
        <img src={editIcon} alt="Edit icon" className="h-6 w-6 mr-3 ml-1" />
        Edit
      </button>
      <button className="text-red-500 flex items-center" onClick={handleDelete}>
        <img src={deleteIcon} alt="Delete icon" className="h-12 w-8 mr-3" />
        Delete payment method
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
          <p>Are you sure you want to delete this card?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={confirmDelete}
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

export default CardDetails;

