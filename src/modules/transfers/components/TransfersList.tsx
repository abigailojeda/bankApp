import { useState } from "react"
import { Modal } from "../../shared/components/Modal"
import { FormComponent } from "../../shared/components/FormComponent"
import { FormFieldProps } from "../../shared/types/FormField.types"

export const TransfersList = () => {

    const [isOpen, setIsOpen] = useState(false)

    const fields: FormFieldProps[] = [
        { name: "title", label: "Título", type: "text", required: true, placeholder: "Escribe un título" },
        { name: "amount", label: "Cantidad", type: "number", required: true },
        { name: "date", label: "Fecha", type: "date" },
        {
            name: "category",
            label: "Categoría",
            type: "dropdown",
            options: [
                { label: "Opción 1", value: "option1" },
                { label: "Opción 2", value: "option2" },
            ],
            placeholder: "Selecciona una categoría",
        },
    ];

    const initialValues = {
        title: "",
        amount: 0,
        date: "",
        category: "",
    };

    const handleFormSubmit = (values: Record<string, string | number>) => {
        console.log("Enviando formulario con:", values);
        setIsOpen(false);
    };

    return (
        <div className="page-container">

            <button onClick={() => setIsOpen(true)}>Abrir Modal</button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)} 
                ChildComponent={(props) => <FormComponent {...props} fields={fields} initialValues={initialValues} onSubmit={handleFormSubmit} onClose={() => setIsOpen(false)}/> }
            />

        </div>
    )
}
