import React from "react";
import { ConfirmationComponentProps } from "../types/Modal.types";

export const ConfirmationComponent: React.FC<ConfirmationComponentProps> = ({
  message,
  error,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="flex flex-col">
      <p className={`mb-6 text-text ${error ? 'text-red' : ''}`}>{error || message}</p>
      <div className="flex justify-end space-x-4">
      {!error && (
          <button
            onClick={onConfirm}
          className="confirm-button"
        >
          Confirm
        </button>
      )}
        <button
          onClick={onClose}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};