import React from "react";

function ChangePhoto({onUploadPhoto, onDeletePhoto, onClose }) {
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white w-80 pt-5 rounded-md text-center  ">
      <p className="mb-4 text-xl">Change profile image</p>
      <div className="w-full flex flex-col justify-end ">
      <button
        className="w-full hover:bg-gray-300 text-fourth  py-2 px-4 "
        onClick={onUploadPhoto}
      >
        Upload image
      </button>  
      <button
        className="w-full hover:bg-gray-300 text-red-600  py-2 px-4 "
        onClick={onDeletePhoto}
      >
        Delete current image
      </button>
      <button
        className="w-full hover:bg-gray-300 text-gray-800  py-2 px-4 "
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
