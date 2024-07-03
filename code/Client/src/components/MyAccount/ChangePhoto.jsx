import React from "react";

function ChangePhoto({onUploadPhoto, onDeletePhoto, onClose }) {
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white w-80 pt-5 rounded-md text-center divide-y ">
      <p className="mb-4 text-xl">Change profile image</p>
      <div className="w-full flex flex-col justify-end divide-y">
      <button
        className="w-full text-fourth  py-2 px-4 rounded-md"
        onClick={onUploadPhoto}
      >
        Upload image
      </button>  
      <button
        className="w-full  text-red-600  py-2 px-4 rounded-md"
        onClick={onDeletePhoto}
      >
        Delete current image
      </button>
      <button
        className="w-full text-gray-800  py-2 px-4 rounded-md"
        onClick={onClose}
      >
        Cancel
      </button>
      </div>
    </div>
    </div>
  );
}

export default ChangePhoto;
