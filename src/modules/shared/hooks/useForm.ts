// hooks/useForm.ts
import { ChangeEvent, useState } from "react";

interface FormState {
  [key: string]: string | number;
}

interface UseFormReturn {
  formState: FormState;
  onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onResetForm: () => void;
}

export function useForm(initialForm: FormState = {}): UseFormReturn {
  const [formState, setFormState] = useState<FormState>(initialForm);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    onInputChange,
    onResetForm,
  };
}
