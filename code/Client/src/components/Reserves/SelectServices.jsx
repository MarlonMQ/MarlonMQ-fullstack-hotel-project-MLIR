import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Option = ({ image, text, price, selected, onSelect }) => (
  <div
    className={`border p-4 m-2 rounded ${selected ? 'opacity-50' : 'bg-white'}`}
    onClick={onSelect}
  >
    <img src={image} alt={text} className="w-24 h-24 mx-auto" />
    <p className="text-center mt-2">{text}</p>
    <p className="text-center mt-2">${price}</p>
  </div>
);

const SelectServices = ({formik, setTotalAmount, totalAmount, canPassThroughRooms}) => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const getServices = async() => {
            const result = await axios.get(`http://localhost:4000/services/all`);
            console.log(result.data);
            setOptions(result.data);
            return result;
        }
        getServices();
    }, [])
  
  const [selectedOptions, setSelectedOptions] = useState([]);


  
  const handleSelect = (option) => {
    setSelectedOptions(
      (prev) => {
        if (prev.some((selected) => selected.id_service === option.id_service)) {
          setTotalAmount(totalAmount-option.price);
          return prev.filter((selected) => selected.id_service !== option.id_service)
        } else {
          setTotalAmount(totalAmount+option.price);
          return [...prev, option]
        }
        
      }

    );
  };

  const handleSubmit = () => {
    formik.setFieldValue('services', selectedOptions);
    formik.setFieldValue('totalAmount', totalAmount);
    if (canPassThroughRooms == 0) {
      window.location.reload();
    }
  };
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Select Facilities ${totalAmount}</h1>
      <div className="grid grid-cols-2 gap-4">
        {
            options.map((option) => (
            <Option
                key={option.id_service}
                image={option.imageUrl}
                text={option.title}
                price={option.price}
                selected={selectedOptions.some((selected) => selected.id_service === option.id_service)}
                onSelect={() => handleSelect(option)}
            />
            ))
        }
      </div>
      <button
        type='submit'
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Reserve
      </button>
    </div>
  );
};

export default SelectServices;
