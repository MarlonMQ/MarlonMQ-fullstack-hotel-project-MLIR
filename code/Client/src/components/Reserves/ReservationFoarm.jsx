import React, { useState, useContext } from 'react';
import axios from 'axios';
import ReservationTable from './ReservationTable';
import { AuthContext } from '../loginComponents/AuthContext.jsx';

function ReservationForm() {

    const {token} = useContext(AuthContext);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        checkIn: '',
        checkOut: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'El nombre es obligatorio.';
            formIsValid = false;
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'El apellido es obligatorio.';
            formIsValid = false;
        }

        if (!formData.email) {
            errors.email = 'El correo electrónico es obligatorio.';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Correo electrónico no válido.';
            formIsValid = false;
        }

        if (!formData.checkIn) {
            errors.checkIn = 'La fecha de entrada es obligatoria.';
            formIsValid = false;
        }

        if (!formData.checkOut) {
            errors.checkOut = 'La fecha de salida es obligatoria.';
            formIsValid = false;
        } else if (new Date(formData.checkIn) >= new Date(formData.checkOut)) {
            errors.checkOut = 'La fecha de salida debe ser después de la fecha de entrada.';
            formIsValid = false;
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Datos del formulario están correctos, enviar la petición POST
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.post('http://localhost:4000/reservations/', {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut
                });
                
                alert('Reserva creada con éxito!');
                

                // Aquí podrías redirigir al usuario o limpiar el formulario
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    checkIn: '',
                    checkOut: ''
                });
            } catch (error) {
                console.error('Error al enviar la reserva:', error);
                alert('Error al crear la reserva. Por favor, inténtalo de nuevo.');
            }
        } else {
            console.log('Errores en el formulario:', errors);
            alert('Por favor, corrige los errores en el formulario.');
        }
    };

    return (
        <div className='px-4 py-5 bg-white shadow-lg rounded-lg max-w-2xl mx-auto'>
            <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
                <div className="px-2 w-full sm:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Nombre</label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Escribe tu nombre"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                </div>
                <div className="px-2 w-full sm:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Escribe tu apellido"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                </div>
                <div className="px-2 w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Ejemplo: tuemail@dominio.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="px-2 w-full sm:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Fecha de Entrada</label>
                    <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${errors.checkIn ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.checkIn && <p className="text-red-500 text-xs italic">{errors.checkIn}</p>}
                </div>
                <div className="px-2 w-full sm:w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Fecha de Salida</label>
                    <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className={`block w-full p-3 border ${errors.checkOut ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                    {errors.checkOut && <p className="text-red-500 text-xs italic">{errors.checkOut}</p>}
                </div>
                <div className="px-2 w-full">
                    <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
                        Reservar
                    </button>
                </div>
            </form>
            <ReservationTable />
        </div>
    );
}

export default ReservationForm;
