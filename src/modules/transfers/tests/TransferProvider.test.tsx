import React, { useContext, useState } from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import TransferProvider from '../states/TransferContext/TransferProvider';
import { TransferContext } from '../states/TransferContext/TransferContext';
import { AccountContext } from '../../account/states/AccountContext/AccountContext';
import { CurrencyContext } from '../../account/states/CurrencyContext/CurrencyContext';
import { getTransfers, addTransferService, updateTransferService, deleteTransferService, undoTransferService } from '../services/transfer.service';
import { formatAmountDisplayed } from '../../shared/helpers/formatter';
import type { Account } from '../../account/types/account.type';
import type { TransferResponse } from '../types/transfer.types';

vi.mock('../services/transfer.service');
vi.mock('../../shared/helpers/formatter');

const mockAccount: Account = {
  id: 1,
  userId: '1',
  iban: 'TEST123',
  current_balance: '2000 EUR',
  currency: 'EUR'
};

const mockTransfers: TransferResponse[] = [
  {
    id: '1',
    account_id: '1',
    amount: 1000,
    date: '2024-03-20',
    type: 'deposit',
    description: 'Salary',
    currency: 'EUR',
    current_balance: 2000
  },
  {
    id: '2',
    account_id: '1',
    amount: 500,
    date: '2024-03-21',
    type: 'withdrawal',
    description: 'Rent',
    currency: 'EUR',
    current_balance: 1500
  }
];

const mockAccountContext = {
  accounts: [mockAccount],
  currentAccount: mockAccount,
  currentBalance: '2000 EUR',
  iban: 'TEST123',
  currency: 'EUR',
  loading: false,
  error: null,
  refreshAccounts: vi.fn(),
  updateCurrentBalance: vi.fn(),
  updateCurrencyValue: vi.fn(),
  updateCurrency: vi.fn()
};

const mockCurrencyContext = {
  exchangeRates: { EUR: 1, USD: 1.1 },
  loading: false,
  error: null,
  refreshExchangeRates: vi.fn(),
  convertCurrency: vi.fn((amount: number) => amount)
};

// Test component to access context
const TestComponent = () => {
  const { transfers, totalIncomes, totalExpenses, loading, error } = useContext(TransferContext);
  return (
    <div>
      <div data-testid="transfers-count">{transfers.length}</div>
      <div data-testid="total-incomes">{totalIncomes}</div>
      <div data-testid="total-expenses">{totalExpenses}</div>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error.message}</div>}
    </div>
  );
};

const renderWithProviders = (children: React.ReactNode) => {
  return render(
    <AccountContext.Provider value={mockAccountContext}>
      <CurrencyContext.Provider value={mockCurrencyContext}>
        <TransferProvider>
          {children}
        </TransferProvider>
      </CurrencyContext.Provider>
    </AccountContext.Provider>
  );
};

describe('TransferProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up default mock implementations
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfers);
    (addTransferService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfers[0]);
    (updateTransferService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfers[0]);
    (deleteTransferService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(true);
    (undoTransferService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfers[0]);
    (formatAmountDisplayed as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (amount: number, currency: string) => `${amount} ${currency}`
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch transfers on mount', async () => {
    await act(async () => {
      renderWithProviders(<TestComponent />);
    });
    
    await waitFor(() => {
      expect(getTransfers).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('transfers-count')).toHaveTextContent('2');
    });
  });

  it('should calculate total incomes and expenses', async () => {
    await act(async () => {
      renderWithProviders(<TestComponent />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('total-incomes')).toHaveTextContent('1000 EUR');
      expect(screen.getByTestId('total-expenses')).toHaveTextContent('500 EUR');
    });
  });

  it('should update totals when currency changes', async () => {
    // First render with initial currency context
    const { rerender } = renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByTestId('total-incomes')).toHaveTextContent('1000 EUR');
      expect(screen.getByTestId('total-expenses')).toHaveTextContent('500 EUR');
    });

    // Create new currency context with doubled conversion rate
    const newCurrencyContext = {
      ...mockCurrencyContext,
      exchangeRates: { EUR: 1, USD: 2 },
      convertCurrency: vi.fn((amount: number, target: string) => {
        // Simulate currency conversion based on exchange rates
        return target === 'EUR' ? amount * 2 : amount;
      })
    };

    // Create new account context with updated currency
    const newAccountContext = {
      ...mockAccountContext,
      currency: 'EUR', // Keep the same currency to ensure conversion happens
      currentBalance: '4000 EUR' // Updated balance after conversion
    };

    // Re-render with new contexts
    await act(async () => {
      rerender(
        <AccountContext.Provider value={newAccountContext}>
          <CurrencyContext.Provider value={newCurrencyContext}>
            <TransferProvider>
              <TestComponent />
            </TransferProvider>
          </CurrencyContext.Provider>
        </AccountContext.Provider>
      );
    });

    // Wait for the effect to run and update the totals
    await waitFor(() => {
      expect(screen.getByTestId('total-incomes')).toHaveTextContent('2000 EUR');
      expect(screen.getByTestId('total-expenses')).toHaveTextContent('1000 EUR');
    });

    // Verify that the conversion was called with correct parameters
    expect(newCurrencyContext.convertCurrency).toHaveBeenCalledWith(1000, 'EUR');
    expect(newCurrencyContext.convertCurrency).toHaveBeenCalledWith(500, 'EUR');
  });

  it('should handle adding a new transfer', async () => {
    const TestComponentWithAdd = () => {
      const { addTransfer } = useContext(TransferContext);
      return (
        <button 
          data-testid="add-transfer"
          onClick={() => addTransfer({
            accountId: 1,
            amount: 100,
            type: 'deposit',
            description: 'Test Transfer'
          })}
        >
          Add Transfer
        </button>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithAdd />);
    });

    await act(async () => {
      screen.getByTestId('add-transfer').click();
    });

    expect(addTransferService).toHaveBeenCalledWith({
      accountId: 1,
      amount: 100,
      type: 'deposit',
      description: 'Test Transfer'
    });
    expect(getTransfers).toHaveBeenCalledTimes(2);
  });

  it('should handle updating a transfer', async () => {
    const TestComponentWithUpdate = () => {
      const { updateTransfer } = useContext(TransferContext);
      return (
        <button 
          data-testid="update-transfer"
          onClick={() => updateTransfer({
            id: '1',
            accountId: 1,
            amount: 1200,
            type: 'deposit',
            description: 'Updated Transfer'
          })}
        >
          Update Transfer
        </button>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithUpdate />);
    });

    await act(async () => {
      screen.getByTestId('update-transfer').click();
    });

    expect(updateTransferService).toHaveBeenCalledWith({
      id: '1',
      accountId: 1,
      amount: 1200,
      type: 'deposit',
      description: 'Updated Transfer'
    });
    expect(getTransfers).toHaveBeenCalledTimes(2);
  });

  it('should handle deleting a transfer', async () => {
    const mockTransfersWithTarget = [...mockTransfers];
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfersWithTarget);

    const TestComponentWithDelete = () => {
      const { deleteTransfer } = useContext(TransferContext);
      return (
        <button 
          data-testid="delete-transfer"
          onClick={() => deleteTransfer('1')}
        >
          Delete Transfer
        </button>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithDelete />);
    });

    await act(async () => {
      screen.getByTestId('delete-transfer').click();
    });

    expect(deleteTransferService).toHaveBeenCalledWith('1');
    expect(getTransfers).toHaveBeenCalledTimes(2);
  });

  it('should handle undoing a transfer', async () => {
    const mockTransfersWithTarget = [...mockTransfers];
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfersWithTarget);

    const TestComponentWithUndo = () => {
      const { undoTransfer } = useContext(TransferContext);
      return (
        <button 
          data-testid="undo-transfer"
          onClick={() => undoTransfer('1')}
        >
          Undo Transfer
        </button>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithUndo />);
    });

    await act(async () => {
      screen.getByTestId('undo-transfer').click();
    });

    expect(undoTransferService).toHaveBeenCalledWith('1');
    expect(getTransfers).toHaveBeenCalledTimes(2);
  });

  it('should handle errors during fetch', async () => {
    const error = new Error('Failed to fetch transfers');
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    await act(async () => {
      renderWithProviders(<TestComponent />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to fetch transfers');
    });
  });

  it('should handle errors during add transfer', async () => {
    const error = new Error('Failed to add transfer');
    (addTransferService as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    const TestComponentWithError = () => {
      const { addTransfer, error } = useContext(TransferContext);
      return (
        <div>
          <button 
            data-testid="add-transfer"
            onClick={() => {
              addTransfer({
                accountId: 1,
                amount: 100,
                type: 'deposit',
                description: 'Test Transfer'
              }).catch(() => {});
            }}
          >
            Add Transfer
          </button>
          {error && <div data-testid="error">{error.message}</div>}
        </div>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithError />);
    });

    await act(async () => {
      screen.getByTestId('add-transfer').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to add transfer');
    });
  });

  it('should handle transfer not found error', async () => {
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    const TestComponentWithError = () => {
      const { deleteTransfer, error } = useContext(TransferContext);
      return (
        <div>
          <button 
            data-testid="delete-transfer"
            onClick={() => {
              deleteTransfer('999').catch(() => {});
            }}
          >
            Delete Non-existent Transfer
          </button>
          {error && <div data-testid="error">{error.message}</div>}
        </div>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithError />);
    });

    await act(async () => {
      screen.getByTestId('delete-transfer').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Transfer not found');
    });
  });

  it('should refresh transfers when called', async () => {
    const TestComponentWithRefresh = () => {
      const { refreshTransfers } = useContext(TransferContext);
      return (
        <button 
          data-testid="refresh-transfers"
          onClick={() => refreshTransfers()}
        >
          Refresh
        </button>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithRefresh />);
    });

    await act(async () => {
      screen.getByTestId('refresh-transfers').click();
    });

    expect(getTransfers).toHaveBeenCalledTimes(2); // Once on mount, once on refresh
  });

  it('should calculate totals correctly for different currencies', async () => {
    const mockTransfersWithDifferentCurrencies: TransferResponse[] = [
      {
        id: '1',
        account_id: '1',
        amount: 1000,
        date: '2024-03-20',
        type: 'deposit',
        description: 'Salary EUR',
        currency: 'EUR',
        current_balance: 2000
      },
      {
        id: '2',
        account_id: '1',
        amount: 500,
        date: '2024-03-21',
        type: 'withdrawal',
        description: 'Rent USD',
        currency: 'USD',
        current_balance: 1500
      }
    ];

    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockTransfersWithDifferentCurrencies);
    const mockConvertCurrency = vi.fn((amount: number) => amount * 1.1);
    const newCurrencyContext = {
      ...mockCurrencyContext,
      convertCurrency: mockConvertCurrency
    };

    await act(async () => {
      render(
        <AccountContext.Provider value={mockAccountContext}>
          <CurrencyContext.Provider value={newCurrencyContext}>
            <TransferProvider>
              <TestComponent />
            </TransferProvider>
          </CurrencyContext.Provider>
        </AccountContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('total-incomes')).toHaveTextContent('1100 EUR');
      expect(screen.getByTestId('total-expenses')).toHaveTextContent('550 EUR');
    });
  });

  it('should validate transfer data for different operations', async () => {
    const TestComponentWithValidation = () => {
      const { validateTransferData } = useContext(TransferContext);
      const [validationError, setValidationError] = useState<string | null>(null);

      const validate = (operation: 'add' | 'update' | 'undo' | 'delete') => {
        const errors = validateTransferData({
          amount: -100,
          type: 'deposit',
          description: ''
        }, operation);
        setValidationError(Object.values(errors)[0] || null);
      };

      return (
        <div>
          <button data-testid="validate-add" onClick={() => validate('add')}>Validate Add</button>
          <button data-testid="validate-update" onClick={() => validate('update')}>Validate Update</button>
          <button data-testid="validate-delete" onClick={() => validate('delete')}>Validate Delete</button>
          {validationError && <div data-testid="validation-error">{validationError}</div>}
        </div>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithValidation />);
    });

    await act(async () => {
      screen.getByTestId('validate-add').click();
    });
    expect(screen.getByTestId('validation-error')).toBeTruthy();

    await act(async () => {
      screen.getByTestId('validate-update').click();
    });
    expect(screen.getByTestId('validation-error')).toBeTruthy();

    await act(async () => {
      screen.getByTestId('validate-delete').click();
    });
    expect(screen.getByTestId('validation-error')).toBeTruthy();
  });

  it('should handle errors during update transfer', async () => {
    const error = new Error('Failed to update transfer');
    (updateTransferService as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    const TestComponentWithError = () => {
      const { updateTransfer, error } = useContext(TransferContext);
      return (
        <div>
          <button 
            data-testid="update-transfer"
            onClick={() => {
              updateTransfer({
                id: '1',
                accountId: 1,
                amount: 100,
                type: 'deposit',
                description: 'Test Transfer'
              }).catch(() => {});
            }}
          >
            Update Transfer
          </button>
          {error && <div data-testid="error">{error.message}</div>}
        </div>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithError />);
    });

    await act(async () => {
      screen.getByTestId('update-transfer').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to update transfer');
    });
  });

  it('should handle errors during delete transfer', async () => {
    const error = new Error('Failed to delete transfer');
    (deleteTransferService as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);
    const mockTransfersWithTarget = [...mockTransfers];
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfersWithTarget);

    const TestComponentWithError = () => {
      const { deleteTransfer, error } = useContext(TransferContext);
      return (
        <div>
          <button 
            data-testid="delete-transfer"
            onClick={() => {
              deleteTransfer('1').catch(() => {});
            }}
          >
            Delete Transfer
          </button>
          {error && <div data-testid="error">{error.message}</div>}
        </div>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithError />);
    });

    await act(async () => {
      screen.getByTestId('delete-transfer').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to delete transfer');
    });
  });

  it('should handle errors during undo transfer', async () => {
    const error = new Error('Failed to undo transfer');
    (undoTransferService as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);
    const mockTransfersWithTarget = [...mockTransfers];
    (getTransfers as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTransfersWithTarget);

    const TestComponentWithError = () => {
      const { undoTransfer, error } = useContext(TransferContext);
      return (
        <div>
          <button 
            data-testid="undo-transfer"
            onClick={() => {
              undoTransfer('1').catch(() => {});
            }}
          >
            Undo Transfer
          </button>
          {error && <div data-testid="error">{error.message}</div>}
        </div>
      );
    };

    await act(async () => {
      renderWithProviders(<TestComponentWithError />);
    });

    await act(async () => {
      screen.getByTestId('undo-transfer').click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to undo transfer');
    });
  });
}); 