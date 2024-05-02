import React from "react";
import ReservationForm from "../components/Reserves/ReservationFoarm";

const reservations = () => {
    return (
        <div className="min-h-screen bg-white">
        <h2 className="mb-12 mt-12 text-center primary-title ">RESERVAS</h2>
        <ReservationForm/>
        </div>
    )
}
export default reservations;