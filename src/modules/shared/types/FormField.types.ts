import { DropdownOption } from "./Dropdown.types";

export interface FormFieldProps {
    name: string;   
    label: string;  
    type: "text" | "number" | "date" | "dropdown";
    options?: DropdownOption[]; 
    placeholder?: string;
    required?: boolean;
  }
  