import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UploadServiceForm = () => {
    /* estado y valores iniciales  */
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      title: '',
      image: null,
    },
  
      /* Parte de validacion  */
    validationSchema: Yup.object({
      title: Yup.string()
        .required('El título es obligatorio'),
      image: Yup.mixed()
        .required('Una imagen es necesaria')
        .test("fileSize", "El archivo es muy grande", value => !value || (value && value.size <= 2080 * 2080))
        .test("fileFormat", "Formato no soportado", value => !value || (value && ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"].includes(value.type)))
    }),

    // envio al back //
    onSubmit: async (values) => {
        console.log('Título recibido:', values.title);
        console.log('URL de la imagen construida:', values.image);

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('image', values.image);
        try {
            console.log("axios post");
            const response = await axios.post('http://localhost:4000/services/upload-service', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Servicio subido con éxito:', response.data);
            alert('Servicio subido con éxito');
            
        } catch (error) {
            console.error('Error al subir el servicio:', error);
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un estado de error
                console.log('Datos del error:', error.response.data);
                console.log('Estado del error:', error.response.status);
                console.log('Cabeceras del error:', error.response.headers);
                alert(`Error al subir el servicio: ${error.response.data.message || 'Error no especificado'}`);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.log('Error request:', error.request);
                alert('Error al subir el servicio: No se recibió respuesta del servidor');
            } else {
                // Algo falló al hacer la solicitud
                console.log('Error message:', error.message);
                alert(`Error al subir el servicio: ${error.message}`);
            }
        }  
      },
    });

//recibir imagen input //
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
        
        {/* Campo 01 */}
        <div>
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Título del Servicio</label>
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
        
        {/* Campo 02 */}
        <div>
          <label htmlFor="image" className="text-sm font-medium text-gray-700">Imagen del Servicio</label>
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
          Subir Servicio
        </button>
      </form>
    </div>
  );
};

export default UploadServiceForm;
