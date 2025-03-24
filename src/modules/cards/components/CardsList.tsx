import { useContext, useState } from "react";
import { CardContext } from "../states/CardContext/CardContext";
import { AuthContext } from "../../auth/states/AuthContext/AuthContext";
import { CardItem_ } from "./CardItem";
import { Modal } from "../../shared/components/Modal";
import { FormComponent } from "../../shared/components/forms/FormComponent";
import { Card } from "../types/card.type";
import { FormFieldProps } from "../../shared/types/FormField.types";
import { formatCardNumberString } from "../../shared/helpers/formatter";
import RealtimeCardNotifier from "./RealtimeCardNotifier";

export const CardsList = () => {

  const { cards, addCard } = useContext(CardContext);
  const { user } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardFormFields:FormFieldProps[] = [
    {
      name: "cardNumber",
      type: "text",
      placeholder: "Card Number",
      required: true,
    },
  ];

  const cardInitialValues = {
    cardNumber: "",
  };

  const handleAddCard = (values: Record<string, string | number>) => {
    (async () => {
      const formattedValues: Card = {
        ...values,
        //by the moment we hardcode the account_id
        accountId: "1",
        cardNumber: formatCardNumberString(String(values?.cardNumber)),
      };

      try {
        await addCard(formattedValues);
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error adding card:", err);
      }
    })();
  };

  const validateCard = (values: Record<string, string | number>) => {
    const errors: { [key: string]: string } = {};

    if (!values.cardNumber) {
      errors.cardNumber = "Card number is required";
    }
    
    //check if card number is valid
    if (!/^[0-9]{16}$/.test(String(values.cardNumber))) {
      errors.cardNumber = "Card number must be 16 digits";
    }

    return errors;
  };

  return (
    <>
      <RealtimeCardNotifier />
      {
        cards.map((card, index) => (
          <CardItem_ key={index} card={card} index={index} user={user} />

        ))
      }

      {/* add card button */}
      <div
      onClick={() => setIsModalOpen(true)}
      className='card-style group bg-secondary hover:bg-secondary/80 mb-4 h-[206px] flex items-center cursor-pointer justify-center p-4 relative'>
        <span className="text-subtitle font-bold">Add Card</span>
        <div className="absolute flex justify-center items-center group-hover:scale-110 bg-bg w-12 h-12 -bottom-2 -right-2 rounded-full">
          <span className="text-subtitle text-2xl">+</span>
        </div>

      </div>

      {/* add card modal */}
      {<Modal
        title='Add Card'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ChildComponent={(props) => <FormComponent {...props}
          fields={cardFormFields}
          initialValues={cardInitialValues}
          onSubmit={handleAddCard}
          onClose={() => setIsModalOpen(false)}
          validate={(values) => validateCard(values)}
        />}
      />}
    </>
  )
}
