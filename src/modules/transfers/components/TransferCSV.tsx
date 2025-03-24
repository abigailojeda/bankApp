import React, { useContext, useState } from 'react';
import { TransferContext } from '../states/TransferContext/TransferContext';
import { AccountContext } from '../../account/states/AccountContext/AccountContext';
import { parseCSVToTransfers, exportTransfersToCSV } from '../services/csv.service';
import { addTransferService } from '../services/transfer.service';
import { ActionButton } from '../../shared/components/ActionButton';
import { ImportIcon } from '../../shared/components/icons/ImportIcon';
import { ExportIcon } from '../../shared/components/icons/ExportIcon';

const TransferCSV: React.FC = () => {
  const { transfers, refreshTransfers } = useContext(TransferContext);
  const { currentAccount } = useContext(AccountContext);
  const [error, setError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a valid CSV file');
      return;
    }

    setIsImporting(true);
    setError(null);

    try {
      const parsedTransfers = await parseCSVToTransfers(
        file,
        currentAccount || { id: 1, currency: 'EUR' }
      );
      
      for (const transfer of parsedTransfers) {
        await addTransferService({
          accountId: Number(transfer.account_id),
          date: transfer.date,
          amount: transfer.amount,
          type: transfer.type,
          description: transfer.description
        });
      }

      await refreshTransfers();
      event.target.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import transfers');
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = () => {
    const csv = exportTransfersToCSV(transfers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transfers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
        
         <div className='relative'>
         <ActionButton
            color="text-subtitle"
            fontSize="text-sm"
            fontWeight="font-semibold"
            hasBackground={true}
            backgroundColor="bg-gray"
            rounded={true}
            Icon={() => <ImportIcon width="22" height="22" />}
            hoverBackgroundColor="hover:bg-gray/90"
            width="w-8"
            height="h-8"
            click={() => document.getElementById('csvFileInput')?.click()}
            disabled={isImporting}
          />
          <input
            type="file"
            id="csvFileInput"
            accept=".csv"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isImporting}
          />
          {error && <p className="text-red-500 text-sm mb-2 absolute w-[200px] -right-8">{error}</p>}
         </div>
          <ActionButton
            color="text-subtitle"
            fontSize="text-sm"
            fontWeight="font-semibold"
            hasBackground={true}
            backgroundColor="bg-gray"
            rounded={true}
            Icon={() => <ExportIcon width="22" height="22" />}
            hoverBackgroundColor="hover:bg-gray/90"
            width="w-8"
            height="h-8"
            click={handleExport}
          />
    </>      
  );
};

export default TransferCSV;
