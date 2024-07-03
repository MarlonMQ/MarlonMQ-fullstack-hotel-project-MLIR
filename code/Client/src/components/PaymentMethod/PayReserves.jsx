import React from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PUb49F6GDS5rNuLeuAqWvcghlXcgUHPyggXuRQQcJ4Ihoz61sfLlQDaSERKljnakQqlwaquQLlg8JsSsVPVVeCE00VejmjCsB');

const PayReserves = () => {
  const { reservationId, total, checkIn, checkOut, id_services, num_room } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        reservationId={reservationId}
        total={total}
        checkIn={checkIn}
        checkOut={checkOut}
        id_services={id_services}
        num_room={num_room}
      />
    </Elements>
  );
};

export default PayReserves;

