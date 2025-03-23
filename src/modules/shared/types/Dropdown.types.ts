export type DropdownOption = {
    label: string;
    value: string;
};

export type DropdownProps = {
    options: DropdownOption[];
    hasActionButton: boolean;
    selectedValue: string;
    onSelect: (value: string) => void;
    searchable?: boolean;
};