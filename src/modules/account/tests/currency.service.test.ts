import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllExchangeRates, updateCurrencyService } from '../services/currency.service';
import { filterValidCurrencyCodes } from '../../shared/helpers/formatter';

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock('../../shared/helpers/formatter');
const mockFilterValidCurrencyCodes = vi.mocked(filterValidCurrencyCodes);

describe('Currency Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFilterValidCurrencyCodes.mockImplementation((rates: Record<string, number>) => rates);
  });

  describe('getAllExchangeRates', () => {
    const mockRates = {
      eur: {
        usd: 1.1,
        gbp: 0.85,
        jpy: 130
      }
    };

    it('should fetch exchange rates successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRates)
      });

      const result = await getAllExchangeRates('EUR');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://latest.currency-api.pages.dev/v1/currencies/eur.min.json'
      );
      expect(result).toEqual(mockRates.eur);
      expect(mockFilterValidCurrencyCodes).toHaveBeenCalledWith(mockRates.eur);
    });

    it('should use EUR as default currency', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRates)
      });

      await getAllExchangeRates();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://latest.currency-api.pages.dev/v1/currencies/eur.min.json'
      );
    });

    it('should handle network error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Network Error'
      });

      await expect(getAllExchangeRates()).rejects.toThrow('Network response was not ok: Network Error');
    });

    it('should handle fetch error', async () => {
      const error = new Error('Failed to fetch');
      mockFetch.mockRejectedValueOnce(error);

      await expect(getAllExchangeRates()).rejects.toThrow(error);
    });
  });

  describe('updateCurrencyService', () => {
    const mockResponse = {
      data: {
        updateCurrency: {
          id: 1,
          currency: 'USD',
          current_balance: 1000
        }
      }
    };

    beforeEach(() => {
      process.env.VITE_SERVER_URL = 'http://test-server.com';
    });

    it('should update currency successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      await updateCurrencyService(1, 1000, 'USD');

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.variables).toEqual({
        accountId: 1,
        currency: 'USD',
        balance: 1000
      });
    });

    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Currency update failed' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(updateCurrencyService(1, 1000, 'USD')).rejects.toThrow('Currency update failed');
    });

    it('should handle network errors', async () => {
      const error = new Error('Network error');
      mockFetch.mockRejectedValueOnce(error);

      await expect(updateCurrencyService(1, 1000, 'USD')).rejects.toThrow(error);
    });
  });
}); 