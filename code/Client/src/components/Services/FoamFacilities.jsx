import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { alertClass } from '../utils/Alert.jsx';
import { AuthContext } from '../loginComponents/AuthContext.jsx';
import { toast } from 'react-toastify';

const UploadServiceForm = () => {
  /* state and initial values */
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const { token } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: 0,
      image: null,
    },
  
    /* Validation part */
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required'),
      price: Yup.number()
        .required("Price is required")
        .test("Price test", "Price must be greater than zero", value => value > 0),
      image: Yup.mixed()
        .required('An image is required')
        .test("fileSize", "The file is too large", value => !value || (value && value.size <= 2056 * 2056))
        .test("fileFormat", "Unsupported format", value => !value || (value && ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"].includes(value.type)))
    }),

    // send to backend //
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image', values.image);
      formData.append('price', values.price);

      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post('http://localhost:4000/services/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Service uploaded successfully');
      } catch (error) {
        console.error('Error uploading service:', error);
        if (error.response) {
          // The request was made and the server responded with an error status
          console.log('Error data:', error.response.data);
          console.log('Error status:', error.response.status);
          console.log('Error headers:', error.response.headers);
          toast.error('Error uploading service');
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request error:', error.request);
          toast.error('Error uploading service');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error message:', error.message);
          toast.error('Error uploading service');
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
    <div className=" bg-white p-8 border-t mt-12 mb-12 max-h-auto ">
      {showSuccessAlert && (
        <div className={alertClass('success')}>
          Service uploaded successfully
        </div>
      )}
      {showErrorAlert && (
        <div className={alertClass('error')}>
          Error uploading service
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fourth focus:border-fourth"
          />
          {formik.errors.title && <div className="text-red-500 text-xs italic">{formik.errors.title}</div>}
        </div>

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
        
        {/* Field 02 */}
        <div>
          <label htmlFor="image" className="text-sm font-medium text-gray-700">Image</label>
          <input 
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*" 
            aria-label="Select image" 
            title="Select file"
            className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-fourth hover:file:bg-violet-100"
          />
          {formik.errors.image && <div className="text-red-500 text-xs italic">{formik.errors.image}</div>}
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-full h-auto rounded-md"/>}
        </div>

        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fourth hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload Service
        </button>
      </form>
    </div>
  );
};

export default UploadServiceForm;
