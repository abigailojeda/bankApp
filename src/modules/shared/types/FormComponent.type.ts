import { FormFieldProps } from './FormField.types';

export interface FormComponentProps {
    onClose: () => void;
    fields: FormFieldProps[];
    initialValues: Record<string, string | number>;
    onSubmit: (values: Record<string, string | number>) => void;
  }