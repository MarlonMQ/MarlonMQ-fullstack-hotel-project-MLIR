import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';


const FormRooms = () => {


  /* state and initial values */
  const [imagePreview, setImagePreview] = useState(null);


  const formik = useFormik({
  initialValues: {
    type: '',
    price: 1,
    availables: 1,
    capacity: 1,
    description: '',
    image: null,
  },
  
    /* Validation part */
  validationSchema: Yup.object({
    type: Yup.string()
      .required('Type is required')
      .test("no-numbers", "Numbers are not allowed", value => isNaN(value)),
    price: Yup.number()
      .required('Price is required')
      .min(1, 'Numbers less than or equal to zero are not allowed'),
    availables: Yup.number()
      .required('Available quantity is required')
      .min(1, 'Numbers less than or equal to zero are not allowed'),
    capacity: Yup.number()
      .required('Capacity is required')
      .min(1, 'Numbers less than or equal to zero are not allowed'),
    description: Yup.string()
      .required('Description is required'),
    image: Yup.mixed()
      .required('An image is required')
      .test("fileSize", "The file is too large", value => !value || (value && value.size <= 2080 * 2080))
      .test("fileFormat", "Unsupported format", value => !value || (value && ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"].includes(value.type)))
  }),

  // send to backend //
  onSubmit: async (values) => {
    console.log("Received info: ", values);

    const formData = new FormData();
    formData.append('type', values.type);
    formData.append('price', values.price);
    formData.append('availables', values.availables);
    formData.append('capacity', values.capacity);
    formData.append('description', values.description);
    formData.append('image', values.image);


    try {
      const response = await axios.post('http://localhost:4000/rooms/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Room uploaded successfully:', response.data);
      toast.success('Room uploaded successfully');

      
    } catch (error) {
      console.error('Error uploading room:', error);
      if (error.response) {
        // The request was made and the server responded with an error status
        console.log('Error data:', error.response.data);
        console.log('Error status:', error.response.status);
        console.log('Error headers:', error.response.headers);
        toast.error(`Error uploading room: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request error:', error.request);
        toast.error('Error uploading room: No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
        alert(`Error uploading room: ${error.message}`);
      }
    }  
    },
  });

// receive image input //
  const handleImageChange = (event) => {
  const file = event.currentTarget.files[0];
  formik.setFieldValue("image", file);
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
    setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
  };

  return (
  <div className=" mx-auto bg-white p-8 border border-gray-300 mt-12 mb-12">
    <form onSubmit={formik.handleSubmit} className="space-y-6">
    
    {/* Type field */}
    <div>
      <label htmlFor="type" className="text-sm font-medium text-gray-700">Room Type</label>
      <input
      id="type"
      name="type"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.type}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fourth focus:border-fourth"
      />
      {formik.errors.type && <div className="text-red-500 text-xs italic">{formik.errors.type}</div>}

    </div>
    
    {/* Availables field */}
    <div>
      <label htmlFor="availables" className="text-sm font-medium text-gray-700">Available Rooms</label>
      <input
      id="availables"
      name="availables"
      type="number"
      onChange={formik.handleChange}
      value={formik.values.availables}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fourth focus:border-fourth"
      />
      {formik.errors.availables && <div className="text-red-500 text-xs italic">{formik.errors.availables}</div>}

    </div>

    {/* Price field */}
    <div>
      <label htmlFor="price" className="text-sm font-medium text-gray-700">Price</label>
      <input
      id="price"
      name="price"
      type="number"
      onChange={formik.handleChange}
      value={formik.values.price}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fourth focus:border-fourth"
      />
      {formik.errors.price && <div className="text-red-500 text-xs italic">{formik.errors.price}</div>}

    </div>

    {/* Capacity field */}
    <div>
      <label htmlFor="price" className="text-sm font-medium text-gray-700">Capacity</label>
      <input
      id="capacity"
      name="capacity"
      type="number"
      onChange={formik.handleChange}
      value={formik.values.capacity}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fourth focus:border-fourth"
      />
      {formik.errors.capacity && <div className="text-red-500 text-xs italic">{formik.errors.capacity}</div>}

    </div>

    {/* Description field */}
    <div>
      <label htmlFor="price" className="text-sm font-medium text-gray-700">Description</label>
      <textarea
      id="description"
      name="description"
      type="text"
      onChange={formik.handleChange}
      value={formik.values.description}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fourth focus:border-fourth"
      />
      {formik.errors.description && <div className="text-red-500 text-xs italic">{formik.errors.description}</div>}

    </div>

    {/* Image field */}
    <div>
      <label htmlFor="image" className="text-sm font-medium text-gray-700">Room Image</label>
      <input
      id="image"
      name="image"
      type="file"
      onChange={handleImageChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-fourth hover:file:bg-violet-100"
      />
      {formik.errors.image && <div className="text-red-500 text-xs italic">{formik.errors.image}</div>}
      {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-full h-auto rounded-md"/>}
    </div>

    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fourth hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Upload Room
    </button>
    </form>
  </div>
  );
};

export default FormRooms;
