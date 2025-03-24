import { FormFieldProps } from "../../types/FormField.types";

export const InputDate: React.FC<FormFieldProps> = ({
  name,
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <input
      className='input-style mt-2'
      type="date"
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
};
