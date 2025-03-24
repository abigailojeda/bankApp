import { render, waitFor, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AccountProvider } from '../states/AccountContext';
import { AccountContext, AccountContextValue } from '../states/AccountContext/AccountContext';
import { getAccounts } from '../services/account.service';
import { updateCurrencyService } from '../services/currency.service';
import { formatAmountDisplayed } from '../../shared/helpers/formatter';

vi.mock('../services/account.service');
vi.mock('../services/currency.service');
vi.mock('../../shared/helpers/formatter');

const mockGetAccounts = vi.mocked(getAccounts);
const mockUpdateCurrencyService = vi.mocked(updateCurrencyService);
const mockFormatAmountDisplayed = vi.mocked(formatAmountDisplayed);

describe('AccountProvider', () => {
  const mockAccount = {
    id: 1,
    userId: 'user1',
    iban: 'ES1234567890',
    current_balance: 1000,
    currency: 'EUR'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockFormatAmountDisplayed.mockImplementation((amount: number, currency?: string) => `${amount} ${currency}`);
  });

  it('should fetch and set accounts on mount', async () => {
    mockGetAccounts.mockResolvedValueOnce([mockAccount]);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    // Initially should be loading
    expect(contextValue!.loading).toBe(true);
    expect(contextValue!.accounts).toEqual([]);

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    // After loading
    expect(contextValue!.accounts).toHaveLength(1);
    expect(contextValue!.currentAccount).toEqual({
      ...mockAccount,
      current_balance: `${mockAccount.current_balance} ${mockAccount.currency}`
    });
    expect(contextValue!.currentBalance).toBe(`${mockAccount.current_balance} ${mockAccount.currency}`);
    expect(contextValue!.iban).toBe(mockAccount.iban);
    expect(contextValue!.currency).toBe(mockAccount.currency);
    expect(contextValue!.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const error = new Error('Failed to fetch accounts');
    mockGetAccounts.mockRejectedValueOnce(error);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    expect(contextValue!.error).toEqual(error);
    expect(contextValue!.accounts).toEqual([]);
  });

  it('should update current balance', async () => {
    mockGetAccounts.mockResolvedValueOnce([mockAccount]);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    const newBalance = 2000;
    act(() => {
      contextValue!.updateCurrentBalance(newBalance);
    });

    expect(contextValue!.currentBalance).toBe(`${newBalance} ${mockAccount.currency}`);
  });

  it('should update currency', async () => {
    mockGetAccounts.mockResolvedValueOnce([mockAccount]);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    const newBalance = 2000;
    const newCurrency = 'USD';

    await act(async () => {
      await contextValue!.updateCurrency(newBalance, newCurrency);
    });

    expect(mockUpdateCurrencyService).toHaveBeenCalledWith(
      mockAccount.id,
      newBalance,
      newCurrency
    );
  });

  it('should handle currency update error', async () => {
    mockGetAccounts.mockResolvedValueOnce([mockAccount]);
    const error = new Error('Failed to update currency');
    mockUpdateCurrencyService.mockRejectedValueOnce(error);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    await act(async () => {
      await contextValue!.updateCurrency(2000, 'USD');
    });

    expect(contextValue!.error).toEqual(error);
  });

  it('should update currency value', async () => {
    mockGetAccounts.mockResolvedValueOnce([mockAccount]);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    const newCurrency = 'USD';
    act(() => {
      contextValue!.updateCurrencyValue(newCurrency);
    });

    expect(contextValue!.currency).toBe(newCurrency);
  });

  it('should refresh accounts', async () => {
    const initialAccount = { ...mockAccount };
    const updatedAccount = { ...mockAccount, current_balance: 2000 };
    
    mockGetAccounts
      .mockResolvedValueOnce([initialAccount])
      .mockResolvedValueOnce([updatedAccount]);

    let contextValue: AccountContextValue | undefined;
    render(
      <AccountProvider>
        <AccountContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </AccountContext.Consumer>
      </AccountProvider>
    );

    await waitFor(() => {
      expect(contextValue!.loading).toBe(false);
    });

    expect(contextValue!.currentBalance).toBe(`${initialAccount.current_balance} ${initialAccount.currency}`);

    await act(async () => {
      await contextValue!.refreshAccounts();
    });

    expect(contextValue!.currentBalance).toBe(`${updatedAccount.current_balance} ${updatedAccount.currency}`);
    expect(mockGetAccounts).toHaveBeenCalledTimes(2);
  });
}); 