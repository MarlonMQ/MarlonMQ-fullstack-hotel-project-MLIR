import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditServiceForm = ({ service, onSave, onCancel, token }) => {
  const [imagePreview, setImagePreview] = useState(service.imageUrl);

  const formik = useFormik({
    initialValues: {
      title: service.title,
      image: null,
    },
  
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      image: Yup.mixed()
        .test("fileSize", "The file is too large", value => !value || (value && value.size <= 2056 * 2056))
        .test("fileFormat", "Unsupported format", value => !value || (value && ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"].includes(value.type)))
    }),

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.image) {
        formData.append('image', values.image);
      }

      try {
        console.log("Service ID being sent: ", service.id_service); // Log for debugging
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.put(`http://localhost:4000/services/${service.id_service}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Service updated successfully');
        onSave();
      } catch (error) {
        console.error('Error updating service:', error);
        toast.error('Error updating service');
      }
    },
  });

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
    <div className="bg-white p-8 border-t mt-12 mb-12 max-h-auto">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Service Title</label>
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
          <label htmlFor="image" className="text-sm font-medium text-gray-700">Service Image</label>
          <input 
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
            accept="image/*" 
            className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-fourth hover:file:bg-violet-100"
          />
          {formik.errors.image && <div className="text-red-500 text-xs italic">{formik.errors.image}</div>}
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-full h-auto rounded-md"/>}
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-4">Save</button>
          <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

EditServiceForm.propTypes = {
  service: PropTypes.shape({
    id_service: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default EditServiceForm;
