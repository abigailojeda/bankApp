import { useState } from "react";

interface ValidationErrors {
  [field: string]: string;
}

interface UseFormValidationResult {
  errors: ValidationErrors;
  validateFields: (values: { text: string; number: string; option: string }) => ValidationErrors;
}

export function useFormValidation(): UseFormValidationResult {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateFields = (values: { text: string; number: string; option: string }) => {
    const newErrors: ValidationErrors = {};

    if (!values.text) {
      newErrors.text = "Text is required.";
    }
    if (!values.number) {
      newErrors.number = "Number is required.";
    } else if (isNaN(Number(values.number))) {
      newErrors.number = "Must be a valid number.";
    }
    if (!values.option) {
      newErrors.option = "Please select an option.";
    }

    setErrors(newErrors);
    return newErrors;
  };

  return { errors, validateFields };
}
