import React, { useState, useContext } from "react";
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import axios from 'axios';
import { DeleteConfirmation } from '../utils/Alert.jsx';

export default function CardsFacilities({ image, title }) {

  return (
    <div className="relative flex flex-col items-center mb-10">
      <img src={image} alt={title} className="items-center rounded-md brightness-50 object-cover px-12" />
      <h2 className="text-black secondary-title text-center bg-white absolute bottom-0 px-16">{title}</h2>
    </div>
  );
}
