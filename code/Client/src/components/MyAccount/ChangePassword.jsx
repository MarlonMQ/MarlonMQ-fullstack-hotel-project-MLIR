import React from "react";
import FormBox from "./FormBox";

function ChangePassword({onClose, onConfirm, handleChange, values, errors, handleBlur, touched}) {
  
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-md space-y-2">
      <p className="mb-4">
        Please fill out all the fields to change your password
      </p>
      <div className="flex items-center flex-col space-y-1">
        <div className="px-2 w-full sm:w-full">
          <FormBox 
            title="Curren Password"
            name="password"
            type="password"
            placeholder={"Enter your current password"}
            error={touched.password && errors.password}
            value={values.password}
            change={handleChange}
            blur={handleBlur}
          />
        </div>
        <div className="px-2 w-full sm:w-full">
          <FormBox 
            title="New Password"
            name="newPassword"
            type="password"
            placeholder={"Enter your new password"}
            change={handleChange}
            value={values.newPassword}
            error={touched.newPassword && errors.newPassword}
            blur={handleBlur}
          />
        </div>
        <div className="px-2 w-full sm:w-full">
          <FormBox 
            title="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder={"Confirm your new password"}
            change={handleChange}
            value={values.confirmPassword}
            error={touched.confirmPassword && errors.confirmPassword}
            blur={handleBlur}
          />
        </div>
      <div className="pt-3 flex flex-row justify-between w-full">
        <button
          className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-md "
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-sky-400 hover:bg-sky-300 text-white font-bold py-2 px-4 rounded-md "
          onClick={onConfirm}
        >
          Change Password
        </button>

      </div>
      </div>
    </div>
    </div>
  );
}

export default ChangePassword;
