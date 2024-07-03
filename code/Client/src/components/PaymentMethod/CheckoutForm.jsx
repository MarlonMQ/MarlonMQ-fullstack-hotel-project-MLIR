import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { TailSpin } from 'react-loader-spinner';
import CardCarousel from './carrusel.jsx';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const CheckoutForm = ({ reservationId, total, checkIn, checkOut, id_services, num_room }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Solicita el clientSecret al backend
    axios.post('http://localhost:4000/payment', { amount: total }) // Monto en centavos
      .then(response => {
        setClientSecret(response.data.clientSecret);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsModalOpen(true); // Mostrar el modal cuando se hace clic en pagar
  };

  const confirmPayment = async () => {
    setIsModalOpen(false); // Cerrar el modal
    setIsProcessing(true); // Deshabilitar el botón de pagar

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
      setIsProcessing(false); // Volver a habilitar el botón si hay un error
      toast.error('Error en el pago');
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentSuccess(true);
      // Actualizar el estado de la reserva a "paid"
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.put(`http://localhost:4000/reservations/${reservationId}/changestatus`, { status: 'paid' })
        .then(response => {
          console.log(response.data.message);
          console.log('Reserva actualizada');
          setIsProcessing(false); // Detener el loader
          toast.success('¡Pago exitoso!');
          // Crear la factura
          createInvoice();
        })
        .catch(error => {
          console.error(error.message);
          setIsProcessing(false); // Volver a habilitar el botón si hay un error
          toast.error('Error actualizando la reserva');
        });
    }
  };

  const createInvoice = () => {
    const email = JSON.parse(localStorage.getItem('email'));
    const invoiceData = {
      reservationId,
      total,
      checkIn,
      checkOut,
      id_services,
      num_room,
      userEmail: email
    };

    axios.post('http://localhost:4000/payment/billing', invoiceData)
      .then(response => {
        console.log(response.data.message);
        toast.success('¡Factura creada exitosamente!');
      })
      .catch(error => {
        console.error(error.message);
        toast.error('Error al crear la factura');
      });
  };

  const handleCardInputChange = () => {
    setError(null); // Limpiar los mensajes de error cuando se cambia la entrada de la tarjeta
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Your cards</h2>
      <CardCarousel />
      <h2 className="text-2xl font-bold mb-6 text-center">Information to pay</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement className="p-3 border border-gray-300 rounded" onChange={handleCardInputChange} />
        </div>
        <div className="flex justify-center items-center">
          {isProcessing ? (
            <TailSpin
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
            />
          ) : (
            <button type="submit" disabled={paymentSuccess || !stripe} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              {paymentSuccess ? 'Pagado' : 'Pagar'}
            </button>
          )}
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        {paymentSuccess && <div className="text-green-500 mt-4">¡Pago exitoso!</div>}
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Payment"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Confirm Payment</h2>
          <p>Are you sure you want to pay ${total}?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={confirmPayment}
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

export default CheckoutForm;




