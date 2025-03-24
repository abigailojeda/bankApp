import { formatNumberString } from "../../helpers/formatter";
import { FormFieldProps } from "../../types/FormField.types";

export const InputNumber: React.FC<FormFieldProps> = ({
  name,
  value,
  placeholder,
  required,
  onChange,
}) => {

  const formatBeforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberString(e.target.value);
    if (onChange) onChange({
      target: {
        name: e.target.name,
        value: formatted,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <input
      className='input-style mt-2'
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={formatBeforeChange}
    />
  );
};
