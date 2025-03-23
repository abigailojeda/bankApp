import { FormFieldProps } from '../../types/FormField.types';


export const InputText: React.FC<FormFieldProps> = ({
  name,
  value,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <input
      className='input-style'
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
    />
  );
};
