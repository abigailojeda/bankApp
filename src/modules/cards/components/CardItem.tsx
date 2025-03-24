import { formatCardNumber } from "../../shared/helpers/formatter"
import { CardItemProps } from "../types/card.type"


export const CardItem_:React.FC<CardItemProps> = ({
  card,
  index,
  user
}) => {
  return (
    <div key={card.id} className={`card-style mb-4 h-[206px] flex flex-col justify-between p-4 ${index === 0 ? 'bg-gradient-to-r from-purple to-blue' : 'bg-gradient-to-r from-blue dark:to-greenpale to-green'}`}>

      <div className="flex justify-between text-white font-semibold">
        <span>{user?.name} {user?.surname}</span>
        <span>MAGICBANK</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-sm text-white font-semibold">{formatCardNumber(card.cardNumber)}</h2>
        <div className="flex ">
          <div className="w-8 h-8 rounded-full bg-redcard -mr-2 z-[2]"></div>
          <div className="w-8 h-8 rounded-full bg-orangecard"></div>
        </div>
      </div>

    </div>
  )
}
