import { ChangeEvent } from "react";
import { DropdownOption } from "./Dropdown.types";
export interface FormFieldProps {
    name: string;   
    label?: string;  
    value?: string | number;
    type?: "text" | "number" | "date" | "dropdown";
    options?: DropdownOption[]; 
    placeholder?: string;
    required?: boolean;
    height?: string;
    backgroundColor?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }
  