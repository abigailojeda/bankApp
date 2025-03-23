import React, { FormEvent, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { FormFieldProps } from "../../types/FormField.types";
import { FormComponentProps } from "../../types/FormComponent.type";
import { Dropdown } from "../Dropdown";
import { InputText } from "./InputText";
import { InputNumber } from "./InputNumber";
import { InputDate } from "./InputDate";

export const FormComponent: React.FC<FormComponentProps> = ({
  onClose,
  fields,
  initialValues,
  onSubmit,
  validate,
}) => {
  const { formState, onInputChange, onResetForm } = useForm(initialValues);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors = validate ? validate(formState) : {};
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formState);
  };

  const renderField = (field: FormFieldProps) => {
    const value = formState[field.name] ?? "";
    const errorMsg = errors[field.name];

    switch (field.type) {
      case "text":
        return (
          <>
            <InputText
              name={field.name}
              value={value}
              placeholder={field.placeholder}
              required={field.required}
              onChange={onInputChange}
            />
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          </>
        );
      case "number":
        return (
          <>
            <InputNumber
              name={field.name}
              value={value}
              placeholder={field.placeholder}
              required={field.required}
              onChange={onInputChange}
            />
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          </>
        );
      case "date":
        return (
          <>
            <InputDate
              name={field.name}
              value={value}
              placeholder={field.placeholder}
              required={field.required}
              onChange={onInputChange}
            />
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          </>
        );
      case "dropdown":
        return (
          <>
            <Dropdown
              options={field.options ?? []}
              hasActionButton={false}
              value={String(value)}
              placeholder={field.placeholder}
              onSelect={(val) => {
                onInputChange({
                  target: {
                    name: field.name,
                    value: val,
                  },
                } as React.ChangeEvent<HTMLSelectElement>);
              }}
            />
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label htmlFor={field.name}>{field.label || field.name}</label>
          {renderField(field)}
        </div>
      ))}
      <div style={{ marginTop: "1rem" }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" onClick={onResetForm}>
          Reset
        </button>
      </div>
    </form>
  );
};
