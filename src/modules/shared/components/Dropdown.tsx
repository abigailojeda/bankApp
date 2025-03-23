import { useState, useRef, ChangeEvent, useEffect } from "react";
import { DropdownProps } from "../types/Dropdown.types";
import { ActionButton } from "./ActionButton";

export const Dropdown: React.FunctionComponent<DropdownProps> = ({ options, value, onSelect, searchable, hasActionButton, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [dropdownPosition, setDropdownPosition] = useState("top-10");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const referenceDivRef = useRef<HTMLDivElement>(null);

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;

        if (!target.classList.contains('dropdown-open')) {
            hideDropdown();
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const hideDropdown = () => {
        setIsOpen(false);
        setSearch("");
    }
    
    const getLabel = (value: string) => {
        const option = options.find((option) => option.value === value);
        return option ? option.label : "";
    }
    
    const displayValue = value && value.trim() !== "" ? getLabel(value) : placeholder || "Choose an option";

    useEffect(() => {

        setFilteredOptions(
            options.filter((option) =>
                option.label.toLowerCase().includes(search.toLowerCase())
            )
        );

    }, [search, options]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isOpen && referenceDivRef.current && dropdownRef.current) {
            const windowHeight = window.innerHeight;
            const refRect = referenceDivRef.current.getBoundingClientRect();
            const dropdownHeight = 250;
            if (refRect.top + dropdownHeight > windowHeight) {
                setDropdownPosition("bottom-0");
            } else {
                setDropdownPosition("top-10");
            }
        }
    }, [isOpen]);

    return (
        <>
            <div  className="relative w-full rounded-md dropdown-open"
                ref={referenceDivRef}
            >
                {
                    hasActionButton ? (

                        <ActionButton
                            text={value}
                            click={() =>setIsOpen(!isOpen)}
                            fontWeight="font-semibold"
                            hasBackground={true}
                            backgroundColor='bg-gray'
                            color="text-subtitle"
                            fontSize="text-xl"
                            rounded={true}
                            width="w-12"
                            height="h-12"
                            hoverBackgroundColor="hover:bg-gray/90"
                        />

                    ) : (
                        <input type="text" readOnly
                        value={displayValue}
                        className="dropdown-open input-style cursor-pointer w-full"
                        onClick={() => setIsOpen(!isOpen)}
                        />
                    )
                }

                {
                    isOpen && (

                        <div
                            className={`bg-primary absolute w-[250px] dropdown-open h-[250px] overflow-y-auto shadow-md ${dropdownPosition}`}

                            ref={dropdownRef}>

                            {
                                searchable && (
                                    <div className="border-b bg-primary sticky top-0 dropdown-open dark:border-bg border-gray p-4 mb-4">
                                        <input  className="dropdown-open input-style"autoFocus type="text" onChange={handleSearch} />
                                    </div>
                                )
                            }

                            <div className="flex dropdown-open flex-col">
                                {filteredOptions.map((option, index) => (
                                    <span
                                        className="py-2 dropdown-open text-text px-4 hover:bg-gray/30 dark:hover:bg-bg/30 cursor-pointer"
                                        key={option.label + index}
                                        onClick={() => handleSelect(option.value)}
                                    >
                                        {option.label}
                                    </span>
                                ))}
                            </div>

                        </div>
                    )
                }
            </div >
        </>
    );
}