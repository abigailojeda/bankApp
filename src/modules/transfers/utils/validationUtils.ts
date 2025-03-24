import { formatStringNumber } from '../../shared/helpers/formatter';

export const validateTransaction = (
  values: Record<string, string | number>,
  currentBalance: string,
  currentAccount: { id: number } | null,
  operation: 'add' | 'update' | 'undo' | 'delete' = 'add'
) => {
  const errors: { [key: string]: string } = {};

  const amountNum = formatStringNumber(values.amount);
  if (!values.amount || isNaN(amountNum) || amountNum <= 0) {
    errors.amount = "Invalid amount.";
  }

  if (!values.type || values.type === "") {
    errors.type = "Transaction type is required.";
  } else {
    const currentBalanceNum = Number(formatStringNumber(currentBalance));
    
    // For new withdrawals or updates to withdrawals
    if ((operation === 'add' || operation === 'update') && values.type === "withdrawal") {
      if (amountNum > currentBalanceNum) {
        errors.amount = "Insufficient funds.";
      }
    }
    
    // For undoing or deleting transactions
    if ((operation === 'undo' || operation === 'delete') && values.type === "deposit") {
      // When undoing/deleting a deposit, we need to ensure there's enough balance
      if (amountNum > currentBalanceNum) {
        errors.amount = "Insufficient funds to undo/delete this deposit.";
      }
    }
  }

  if (!values.description) {
    errors.description = "Description is required.";
  }
  
  return errors;
}; 