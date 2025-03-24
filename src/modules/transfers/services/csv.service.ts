import { formatStringNumber } from '../../shared/helpers/formatter';
import { Transfer } from '../types/transfer.types';
import Papa from 'papaparse';

interface CSVTransfer {
  Date: string;
  Amount: string;
  Description: string;
  Type: string;
}

interface CSVTransferData {
  account_id: string;
  amount: number;
  date: string;
  type: string;
  description: string;
}

export const validateCSVFormat = (results: Papa.ParseResult<CSVTransfer>): string[] => {
  const errors: string[] = [];
  const requiredColumns = ['Date', 'Amount', 'Description', 'Type'];
  const validTypes = ['Deposit', 'Withdrawal'];

  // Check headers
  const headers = results.meta.fields || [];
  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
    return errors;
  }

results.data.forEach((row: CSVTransfer, index: number): void => {
    const date: Date = new Date(row.Date);
    if (isNaN(date.getTime())) {
        errors.push(`Invalid date format in row ${index + 1}`);
    }

    const amount: number = parseFloat(row.Amount);
    if (isNaN(amount)) {
        errors.push(`Invalid amount format in row ${index + 1}`);
    }

    if (!validTypes.includes(row.Type)) {
        errors.push(`Invalid type in row ${index + 1}. Must be either 'Deposit' or 'Withdrawal'`);
    }

    if (!row.Description || row.Description.trim() === '') {
        errors.push(`Missing description in row ${index + 1}`);
    }
});

  return errors;
};

export const parseCSVToTransfers = (
  file: File,
  currentAccount: { id: number; currency: string }
): Promise<CSVTransferData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVTransfer>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<CSVTransfer>): void => {
        const errors: string[] = validateCSVFormat(results);
        if (errors.length > 0) {
          reject(new Error(errors.join('\n')));
          return;
        }

        const transfers: CSVTransferData[] = results.data.map((row: CSVTransfer): CSVTransferData => ({
          account_id: String(currentAccount.id),
          amount: Math.abs(parseFloat(row.Amount)),
          date: new Date(row.Date).toISOString().split('T')[0],
          type: row.Type.toLowerCase(),
          description: row.Description
        }));
        
        resolve(transfers);
      },
      error: (error: Error, file: File): void => {
        reject(new Error(`Failed to parse CSV file '${file.name}: ${error.message}`));
      }
    });
  });
};

export const exportTransfersToCSV = (transfers: Transfer[]): string => {
  const csvData = transfers.map(transfer => {
    const [day, month, year] = transfer.date.split('/');
    const amount = formatStringNumber(transfer.amount);
    return {
      Date: `${year}-${month}-${day}`,
      Amount: transfer.type === 'withdrawal' ? `-${amount}` : amount,
      Description: transfer.description,
      Type: transfer.type.charAt(0).toUpperCase() + transfer.type.slice(1)
    };
  });

  return Papa.unparse(csvData);
}; 