import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAccounts } from '../services/account.service';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Account Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.VITE_SERVER_URL = 'http://test-server.com';
  });

  describe('getAccounts', () => {
    const mockAccounts = [
      {
        id: 1,
        iban: 'ES1234567890',
        current_balance: 1000,
        currency: 'EUR'
      },
      {
        id: 2,
        iban: 'ES0987654321',
        current_balance: 2000,
        currency: 'USD'
      }
    ];

    it('should fetch accounts successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ data: { accounts: mockAccounts } })
      });

      const result = await getAccounts();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.query).toContain('accounts');
      expect(result).toEqual(mockAccounts);
    });

    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Failed to fetch accounts' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(getAccounts()).rejects.toThrow('Failed to fetch accounts');
    });

    it('should handle network errors', async () => {
      const error = new Error('Network error');
      mockFetch.mockRejectedValueOnce(error);

      await expect(getAccounts()).rejects.toThrow(error);
    });
  });
}); 