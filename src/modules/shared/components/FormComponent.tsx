import React, { FormEvent } from "react";
import { useForm } from "../hooks/useForm";
import { FormComponentProps } from "../types/FormComponent.type";
import { FormFieldProps } from "../types/FormField.types";
import { Dropdown } from "./Dropdown";

export const FormComponent: React.FC<FormComponentProps> = ({
  onClose,
  fields,
  initialValues,
  onSubmit,
}) => {

  const { formState, onInputChange, onResetForm } = useForm(initialValues);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const renderField = (field: FormFieldProps) => {
    const value = formState[field.name] ?? "";

    switch (field.type) {
      case "text":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            required={field.required}
            onChange={onInputChange}
          />
        );
      case "number":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            required={field.required}
            onChange={onInputChange}
          />
        );
      case "date":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            placeholder={field.placeholder}
            required={field.required}
            onChange={onInputChange}
          />
        );

      case "dropdown":
        return (
          <Dropdown
            options={field.options ?? []}
            hasActionButton={false}
            value={String(value)}
            placeholder={field.placeholder}
            onSelect={(value) => {
              onInputChange({
                target: {
                  name: field.name,
                  value,
                }
              } as React.ChangeEvent<HTMLSelectElement>);
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "1rem" }}>
          <label htmlFor={field.name}>{field.label}</label>
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
