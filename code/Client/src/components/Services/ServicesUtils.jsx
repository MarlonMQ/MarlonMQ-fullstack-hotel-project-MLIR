// Service uttils 
export const alertClass = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700 px-4 py-2 rounded-md text-center py-4 mb-4';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700 px-4 py-2 rounded-md text-center';
      default:
        return 'bg-blue-100 border-blue-400 text-blue-700 px-4 py-2 rounded-md text-center';
    }
  };
  
  
  export function DeleteConfirmation({ show, onClose, onConfirm }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md">
          <p className="mb-4">¿Estás seguro de que quieres eliminar este servicio?</p>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
              onClick={onConfirm}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }
  