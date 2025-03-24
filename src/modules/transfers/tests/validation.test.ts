import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateTransaction } from '../utils/validationUtils';
import { formatStringNumber } from '../../shared/helpers/formatter';

vi.mock('../../shared/helpers/formatter');
const mockFormatStringNumber = vi.mocked(formatStringNumber);

describe('Transfer Validation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFormatStringNumber.mockImplementation((value) => {
      if (typeof value === 'string') {
        const numStr = value.split(' ')[0];
        return Number(numStr);
      }
      return Number(value);
    });
  });

  describe('validateTransaction', () => {
    const currentAccount = { id: 1 };

    describe('Add/Update Operations', () => {
      it('should validate withdrawal against current balance for add operation', () => {
        const values = {
          amount: 30,
          type: 'withdrawal',
          description: 'Test withdrawal'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'add');
        expect(errors.amount).toBe('Insufficient funds.');
      });

      it('should validate withdrawal against current balance for update operation', () => {
        const values = {
          amount: 30,
          type: 'withdrawal',
          description: 'Test withdrawal'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'update');
        expect(errors.amount).toBe('Insufficient funds.');
      });

      it('should allow withdrawal when sufficient balance', () => {
        const values = {
          amount: 10,
          type: 'withdrawal',
          description: 'Test withdrawal'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'add');
        expect(errors.amount).toBeUndefined();
      });

      it('should not check balance for deposits', () => {
        const values = {
          amount: 1000,
          type: 'deposit',
          description: 'Test deposit'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'add');
        expect(errors.amount).toBeUndefined();
      });
    });

    describe('Undo/Delete Operations', () => {
      it('should validate balance when undoing a deposit', () => {
        const values = {
          amount: 30,
          type: 'deposit',
          description: 'Test deposit'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'undo');
        expect(errors.amount).toBe('Insufficient funds to undo/delete this deposit.');
      });

      it('should validate balance when deleting a deposit', () => {
        const values = {
          amount: 30,
          type: 'deposit',
          description: 'Test deposit'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'delete');
        expect(errors.amount).toBe('Insufficient funds to undo/delete this deposit.');
      });

      it('should allow undo of deposit when sufficient balance', () => {
        const values = {
          amount: 10,
          type: 'deposit',
          description: 'Test deposit'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'undo');
        expect(errors.amount).toBeUndefined();
      });

      it('should not check balance when undoing withdrawals', () => {
        const values = {
          amount: 1000,
          type: 'withdrawal',
          description: 'Test withdrawal'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount, 'undo');
        expect(errors.amount).toBeUndefined();
      });
    });

    describe('Common Validations', () => {
      it('should validate amount is positive', () => {
        const values = {
          amount: -10,
          type: 'deposit',
          description: 'Test negative amount'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount);
        expect(errors.amount).toBe('Invalid amount.');
      });

      it('should validate amount is not zero', () => {
        const values = {
          amount: 0,
          type: 'deposit',
          description: 'Test zero amount'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount);
        expect(errors.amount).toBe('Invalid amount.');
      });

      it('should require description', () => {
        const values = {
          amount: 10,
          type: 'deposit',
          description: ''
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount);
        expect(errors.description).toBe('Description is required.');
      });

      it('should require type', () => {
        const values = {
          amount: 10,
          type: '',
          description: 'Test'
        };
        const currentBalance = '20 EUR';

        const errors = validateTransaction(values, currentBalance, currentAccount);
        expect(errors.type).toBe('Transaction type is required.');
      });
    });
  });
}); 