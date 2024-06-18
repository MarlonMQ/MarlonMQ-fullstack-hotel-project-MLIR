import React from "react";

function DeleteAlert({onClose, onConfirm }) {
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md">
      <p className="mb-4">Are you sure you want to delete this account?</p>
      <div className="flex justify-end">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded-md"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
        onClick={onConfirm}
      >
        Delete
      </button>
      </div>
    </div>
    </div>
  );
}

export default DeleteAlert;
