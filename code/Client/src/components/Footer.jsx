import React from 'react';

export const Footer = () => {
  return (
    <>
      <footer className='grid grid-rows-1 sm:grid-cols-3 text-center w-full bg-primary text-white py-16 px-4 mt-5'>
        
        <div className='grid grid-rows-2 content-center py-8'>
          <img
            className="block h-16 rounded-full my-auto mx-auto"
            src="../src/assets/logo/hazbin-logo.jpg"
            alt="Your Company"
          />
          <ul>
            <li>497 Evergreen Rd, Rosaville, CA 95673</li>
            <li>+44 345678903</li>
            <li>hazbin_hotel@gmail.com</li>
          </ul>

        </div>

        <div className='content-center py-8'>
          <ul>
            <li className='mb-4 hover:underline cursor-pointer'>About Us</li>
            <li className='mb-4 hover:underline cursor-pointer'>Contact</li>
            <li className='mb-4 hover:underline cursor-pointer'>Terms & Conditions</li>
          </ul>

        </div>

        <div className='py-8'>
          <ul className='grid grid-rows-3 '>

            <div className='grid grid-cols-2 py-3'>
              <i className="fa-brands fa-facebook fa-2x ml-auto pr-1"></i> <li className='mr-auto pl-1 content-center hover:underline cursor-pointer'>Facebook</li>
            </div>

            <div className='grid grid-cols-2 py-3'>
              <i className="fa-brands fa-square-x-twitter fa-2x ml-auto pr-1"></i> <li className='mr-auto pl-1 content-center hover:underline cursor-pointer'>Twitter</li>
            </div>

            <div className='grid grid-cols-2 py-3'>
              <i className="fa-brands fa-square-instagram fa-2x ml-auto pr-1"></i><li className='mr-auto pl-1 content-center hover:underline cursor-pointer'>Instagram</li>
            </div>

          </ul>
        </div>
      </footer>
      
    </>
  );
};
