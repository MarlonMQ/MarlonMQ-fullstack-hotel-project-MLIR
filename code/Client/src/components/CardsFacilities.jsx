import React from "react";


export default function CardsFacilities({ image, title}) {


    return (
        <div className="relative flex flex-col items-center">
            <img src={image} alt={title} className="items-center px-12 rounded-md"/>
            <h2 className="text-black secondary-title text-center bg-white absolute bottom-0 px-16 ">{title}</h2>
        </div>
    );
}
