import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';
import CardDisplay from './CardDisplay';

const PaymentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = window.localStorage.getItem('email');
    if (email) {
      setUserEmail(JSON.parse(email));
    }
  }, []);

  const validateExpiryDate = (date) => {
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)) {
      return 'Expiry date must be in MM/YY format';
    }
    const [month, year] = date.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
    const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-based month

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Expiry date cannot be in the past';
    }
    return true;
  };

  const onSubmit = async (data) => {
    const newPaymentId = uuidv4();

    const newCardData = {
      ...data,
      id: newPaymentId,
      userEmail: userEmail,
    };

    try {
      const response = await axios.post('http://localhost:4000/payment/add', newCardData);
      toast.success('Payment saved successfully');
      console.log('Payment saved successfully:', response.data);
      // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito o redirigir al usuario
    } catch (error) {
      toast.error('Error saving payment');
      console.error('Error saving payment:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-8">
        <div className="flex-none">
          <CardDisplay 
            cardNumber={cardNumber} 
            cardHolder={cardHolder} 
            expiryDate={expiryDate} 
          />
        </div>
        <div className="bg-white p-8 rounded-xl shadow-xl w-96 border-2 border-gray-300">
          <h2 className="text-2xl mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Card Number</label>
              <input 
                type="text" 
                maxLength="16" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                {...register('cardNumber', { 
                  required: 'Card number is required', 
                  pattern: {
                    value: /^\d{16}$/,
                    message: 'Card number must be 16 digits'
                  }
                })}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              {errors.cardNumber && <p className="text-red-500">{errors.cardNumber.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Card Holder</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                {...register('cardHolder', { required: 'Card holder name is required' })}
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
              {errors.cardHolder && <p className="text-red-500">{errors.cardHolder.message}</p>}
            </div>
            <div className="flex space-x-4 mb-4">
              <div>
                <label className="block text-gray-700">Good Thru</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  {...register('expiryDate', { 
                    required: 'Expiry date is required', 
                    validate: validateExpiryDate
                  })}
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                {errors.expiryDate && <p className="text-red-500">{errors.expiryDate.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700">CVV</label>
                <input 
                  type="text" 
                  maxLength="3" 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  {...register('cvv', { 
                    required: 'CVV is required', 
                    pattern: {
                      value: /^\d{3}$/,
                      message: 'CVV must be 3 digits'
                    }
                  })}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="button" className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;




