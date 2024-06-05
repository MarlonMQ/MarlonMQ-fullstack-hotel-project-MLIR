import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ setActiveComponent }) {
    return (
        <div className="w-64  text-white p-5 shadow-lg bg-primary ">
            <h1 className="text-xl font-semibold mb-5">Dashboard</h1>
            <ul>
                <li onClick={() => setActiveComponent('reserves')} className="block py-2 hover:bg-gray-100 hover:text-black cursor-pointer">Reserves</li>
                <li onClick={() => setActiveComponent('services')} className="block py-2 hover:bg-gray-100 hover:text-black cursor-pointer">Services</li>
                <li onClick={() => setActiveComponent('rooms')} className="block py-2 hover:bg-gray-100 hover:text-black cursor-pointer">Rooms</li>
                <li onClick={() => setActiveComponent('accounts')} className="block py-2 hover:bg-gray-100 hover:text-black cursor-pointer">Accounts</li>
            </ul>
        </div>
    );
}

export default Sidebar;
