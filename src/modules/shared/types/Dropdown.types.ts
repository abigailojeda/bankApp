export type DropdownOption = {
    label: string;
    value: string;
};

export type DropdownProps = {
    options: DropdownOption[];
    hasActionButton: boolean;
    value: string;
    onSelect: (value: string) => void;
    searchable?: boolean;
    placeholder?: string;
    dropdownHeight?: string;
    fullWidth?: string;
};