import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import FormButton from './registerComponents/FormButton';

const PopUp = ({information, firstButtonText, firstButtonOnClick, secondButtonText, secondButtonOnClick}) => {
  return (
    <div className=" bg-black absolute bg-opacity-60 z-10 flex w-full h-full items-center justify-center">
      <div className="w-1/5 min-w-56 h-1/6 min-h-32 bg-gray-300 rounded-lg shadow-lg flex flex-col py-4 justify-between items-center">

        <h3 className="primary-text text-center">{information}</h3>

        <div className='flex flex-row gap-7'>
        <button onClick={firstButtonOnClick} type="button" className="bg-gray-600 hover:bg-gray-400 text-white font-bold  h-1/5 min-h-10 px-4 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center">
            <span className="">{firstButtonText}</span>
        </button>
        <button onClick={secondButtonOnClick} type="button" className="bg-red-700 hover:bg-red-500 text-white font-bold h-1/5 min-h-10 px-4 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center">
            <span className="">{secondButtonText}</span>
        </button>
        </div>
      </div>    
      
    </div>
  );
};

export default PopUp;
