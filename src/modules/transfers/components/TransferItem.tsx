import { DownArrowIcon } from '../../shared/components/icons/DownArrow';
import { UpArrowIcon } from '../../shared/components/icons/UpArrow';
import { Transfer } from '../types/transfer.types';

interface TransferItemProps {
  transfer: Transfer;
}

const TransferItem: React.FC<TransferItemProps> = ({ transfer }) => {
  return (
    <div className="w-full flex justify-between mb-4">
      <section>
        <div className="flex items-center">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${transfer.type === 'deposit' ? 'bg-greenpale text-green' : 'bg-redpale text-red'
            }`}
          >
            {transfer.type === 'deposit' ? (
              <UpArrowIcon width="16" height="16" viewBox="0 0 24 24" />
            ) : (
              <DownArrowIcon width="16" height="16" viewBox="0 0 24 24" />
            )}
          </div>
          <div>
            <p className='text-sm text-text font-semibold ml-2'>
              {transfer.description}
            </p>
            <p className='text-xs text-subtitle ml-2'>
              {transfer.date}
            </p>
          </div>
        </div>


      </section>

      <section>
        <p className='text-sm text-text font-semibold'>
          {transfer.type === 'deposit' ? '+' : '-'}
          {transfer.amount} {transfer.currency}
        </p>
        <p className='text-xs text-subtitle text-right'>
          {transfer.current_balance} {transfer.currency}
        </p>
        
      </section>
    </div>
  );
};

export default TransferItem;
