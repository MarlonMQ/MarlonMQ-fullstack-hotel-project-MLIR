import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FormButton from './registerComponents/FormButton';

const PopUp = ({ title, information, firstButtonText, firstOnButtonClick, secondButtonText, secondOnButtonClick, ButtonColor, ButtonHover}) => {
  return (
    <div className=" bg-black absolute bg-opacity-60 z-10 flex w-full h-full items-center justify-center">
      <div className="w-1/5 min-w-56 h-1/6 min-h-28 bg-gray-300 rounded-lg shadow-lg flex flex-col py-4 justify-between items-center">

        <h3 className="primary-text text-center">{information}</h3>

        <div className='flex flex-row gap-7'>
        <button onClick={firstOnButtonClick} type="button" className="bg-gray-600 hover:bg-gray-400 text-white font-bold  h-1/5 min-h-10 px-4 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center">
            <span className="">{firstButtonText}</span>
        </button>
        <button onClick={secondOnButtonClick} type="button" className={`${ButtonColor} hover:${ButtonHover} text-white font-bold h-1/5 min-h-10 px-4 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center`}>
            <span className="">{secondButtonText}</span>
        </button>
        </div>
      </div>    
      
    </div>
  );
};

export default PopUp;
