import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ReservesAdmin from '../pages/ReservesAdmin';
import AdminPanelServices from '../components/Services/AdminPanelServices';
import FormCRUDRooms from '../components/Rooms/FormCRUDRooms';
import AccountForm from '../components/accounts/AccountForm';

function DashboardLayout() {
    // State to control which component to display
    const [activeComponent, setActiveComponent] = useState('reserves');

    return (
        <div className="flex">
            {/* Pass setActiveComponent to Sidebar to be able to change the state */}
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex-grow p-5">
                {/* Conditional rendering based on the activeComponent state */}
                {activeComponent === 'reserves' && <ReservesAdmin />}
                {activeComponent === 'services' && <AdminPanelServices />}
                {activeComponent === 'rooms' && <FormCRUDRooms />}
                {activeComponent === 'accounts' && <AccountForm />}
            </div>
        </div>
    );
}

export default DashboardLayout;
