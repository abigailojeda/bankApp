import React from "react";
import { ConfirmationComponentProps } from "../types/Modal.types";

export const ConfirmationComponent: React.FC<ConfirmationComponentProps> = ({
  message,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="flex flex-col">
      <p className="mb-6 text-center">{message}</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
