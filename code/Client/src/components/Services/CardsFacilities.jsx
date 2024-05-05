import React, { useState } from "react";
import { DeleteConfirmation } from './FacilitiesUtils';

export default function CardsFacilities({ image, title, deleteService }) {


  return (
    <div className="relative flex flex-col items-center mb-10">
      <img src={image} alt={title} className="items-center rounded-md brightness-50 object-cover px-12" />
      <h2 className="text-black secondary-title text-center bg-white absolute bottom-0 px-16">{title}</h2>
      </div>
  );
}
