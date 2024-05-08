import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const FormRooms = () => {


    /* estado y valores iniciales  */
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
  
      /* Parte de validacion  */
    validationSchema: Yup.object({
      type: Yup.string()
          .required('El tipo es obligatorio')
          .test("no-numbers", "No se pueden introducir números", value => isNaN(value)),
      price: Yup.number()
          .required('El precio es obligatorio')
          .min(1, 'No se permiten números menores o iguales a cero'),
      availables: Yup.number()
          .required('La cantidad disponible es obligatoria')
          .min(1, 'No se permiten números menores o iguales a cero'),
      capacity: Yup.number()
          .required('La capacidad es obligatoria')
          .min(1, 'No se permiten números menores o iguales a cero'),
      description: Yup.string()
          .required('La descripción es obligatoria'),
      image: Yup.mixed()
          .required('Una imagen es necesaria')
          .test("fileSize", "El archivo es muy grande", value => !value || (value && value.size <= 2080 * 2080))
          .test("fileFormat", "Formato no soportado", value => !value || (value && ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/avif"].includes(value.type)))
    }),

    // envio al back //
    onSubmit: async (values) => {
        console.log("Info recibida: ", values);

        const formData = new FormData();
        formData.append('type', values.type);
        formData.append('price', values.price);
        formData.append('availables', values.availables);
        formData.append('capacity', values.capacity);
        formData.append('description', values.description);
        formData.append('image', values.image);


        try {
            console.log("axios post");
            const response = await axios.post('http://localhost:4000/rooms/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('room subido con éxito:', response.data);
            alert('room subido con éxito');

            
        } catch (error) {
            console.error('Error al subir el room:', error);
            if (error.response) {
                // La solicitud fue hecha y el servidor respondió con un estado de error
                console.log('Datos del error:', error.response.data);
                console.log('Estado del error:', error.response.status);
                console.log('Cabeceras del error:', error.response.headers);
                alert(`Error al subir el room: ${error.response.data.message || 'Error no especificado'}`);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.log('Error request:', error.request);
                alert('Error al subir el room: No se recibió respuesta del servidor');
            } else {
                // Algo falló al hacer la solicitud
                console.log('Error message:', error.message);
                alert(`Error al subir el room: ${error.message}`);
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
        
        {/* Campo Type */}
        <div>
          <label htmlFor="type" className="text-sm font-medium text-gray-700">Tipo de habitacion</label>
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
        
        {/* Campo availables*/}
        <div>
          <label htmlFor="availables" className="text-sm font-medium text-gray-700">Habitaciones disponibles</label>
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

        {/* Campo price*/}
        <div>
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Precio</label>
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

        {/* Campo capacity*/}
        <div>
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Capacidad</label>
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

        {/* Campo description*/}
        <div>
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Descripcion</label>
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

        {/* Campo image */}
        <div>
          <label htmlFor="image" className="text-sm font-medium text-gray-700">Imagen de la habitacion</label>
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
          Subir Habitacion
        </button>
      </form>
    </div>
  );
};

export default FormRooms;
