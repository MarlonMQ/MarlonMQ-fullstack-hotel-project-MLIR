import axios from 'axios';
import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';


function ReservationForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        fechaInicio: null,
        fechaFin: null,
        tipoHabitacion: '',
        email: ''
    });

    const { Option } = Select;

    const handleChange = (value, key) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/reservas', formData);
            console.log('Reserva agregada con éxito:', response.data);
            // Aquí podrías resetear el formulario o manejar redirecciones
        } catch (error) {
            console.error('Error al agregar la reserva:', error.response.data);
        }
    };

    return (
        <div className="min-h-screen">
       <div className="max-w-4xl mx-auto p-5 mt-12 bg-white border border-gray-300 shadow-2xl rounded-lg">
            <Form onFinish={handleSubmit} layout="vertical">
                <Form.Item label="Nombre" name="nombre" rules={[{ required: true }]}>
                    <Input className="rounded-lg" onChange={e => handleChange(e.target.value, 'nombre')} />
                </Form.Item>
                <Form.Item label="Fecha de inicio" name="fechaInicio" rules={[{ required: true }]}>
                    <DatePicker className="w-full rounded-lg" onChange={(date, dateString) => handleChange(dateString, 'fechaInicio')} />
                </Form.Item>
                <Form.Item label="Fecha de fin" name="fechaFin" rules={[{ required: true }]}>
                    <DatePicker className="w-full rounded-lg" onChange={(date, dateString) => handleChange(dateString, 'fechaFin')} />
                </Form.Item>
                <Form.Item label="Tipo de habitación" name="tipoHabitacion" rules={[{ required: true }]}>
                    <Select className="w-full rounded-lg" onChange={value => handleChange(value, 'tipoHabitacion')}>
                        <Option value="sencilla">Sencilla</Option>
                        <Option value="doble">Doble</Option>
                        <Option value="suite">Suite</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input type="email" className="rounded-lg" onChange={e => handleChange(e.target.value, 'email')} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold  px-4 rounded-lg">
                        Agregar Reserva
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    );
}

export default ReservationForm;