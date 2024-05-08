import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ReservesAdmin from '../pages/ReservesAdmin';
import AdminPanelServices from '../components/Services/AdminPanelServices';
import FormCRUDRooms from '../components/Rooms/FormCRUDRooms';

function DashboardLayout() {
    // Estado para controlar qué componente mostrar
    const [activeComponent, setActiveComponent] = useState('reserves');

    return (
        <div className="flex">
            {/* Pasar setActiveComponent a Sidebar para poder cambiar el estado */}
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-grow p-5">
                {/* Renderizado condicional basado en el estado activeComponent */}
                {activeComponent === 'reserves' && <ReservesAdmin />}
                {activeComponent === 'services' && <AdminPanelServices />}
                {activeComponent === 'rooms' && <FormCRUDRooms />}
            </div>
        </div>
    );
}

export default DashboardLayout;
