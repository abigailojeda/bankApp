import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getTransfers, addTransferService, updateTransferService, deleteTransferService, undoTransferService } from '../services/transfer.service';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Transfer Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.VITE_SERVER_URL = 'http://test-server.com';
  });

  describe('getTransfers', () => {
    const mockTransfers = [
      {
        id: '1',
        account_id: '1',
        amount: 1000,
        date: '2024-02-20',
        type: 'deposit',
        description: 'Salary',
        currency: 'EUR',
        current_balance: 2000
      }
    ];

    it('should fetch transfers successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ data: { transactions: mockTransfers } })
      });

      const result = await getTransfers();

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );
      expect(result).toEqual(mockTransfers);
    });

    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Failed to fetch transfers' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(getTransfers()).rejects.toThrow('Failed to fetch transfers');
    });

    it('should handle network errors', async () => {
      const error = new Error('Network error');
      mockFetch.mockRejectedValueOnce(error);

      await expect(getTransfers()).rejects.toThrow(error);
    });
  });

  describe('addTransferService', () => {
    const mockTransferData = {
      accountId: 1,
      amount: 1000,
      date: '2024-02-20',
      type: 'deposit',
      description: 'Salary'
    };

    const mockResponse = {
      data: {
        createTransaction: {
          id: '1',
          account_id: '1',
          amount: 1000,
          date: '2024-02-20',
          type: 'deposit',
          description: 'Salary',
          currency: 'EUR',
          current_balance: 2000
        }
      }
    };

    it('should add transfer successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await addTransferService(mockTransferData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.variables).toEqual(mockTransferData);
      expect(result).toEqual(mockResponse.data.createTransaction);
    });

    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Failed to create transfer' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(addTransferService(mockTransferData))
        .rejects.toThrow('Failed to create transfer');
    });
  });

  describe('updateTransferService', () => {
    const mockTransferData = {
      id: '1',
      accountId: 1,
      amount: 1500,
      date: '2024-02-20',
      type: 'deposit',
      description: 'Updated Salary'
    };

    const mockResponse = {
      data: {
        updateTransaction: {
          id: '1',
          account_id: '1',
          amount: 1500,
          date: '2024-02-20',
          type: 'deposit',
          description: 'Updated Salary',
          currency: 'EUR',
          current_balance: 2500
        }
      }
    };

    it('should update transfer successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      const result = await updateTransferService(mockTransferData);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.variables).toEqual(mockTransferData);
      expect(result).toEqual(mockResponse.data.updateTransaction);
    });

    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Failed to update transfer' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(updateTransferService(mockTransferData))
        .rejects.toThrow('Failed to update transfer');
    });
  });

  describe('deleteTransferService', () => {
    const transferId = '1';

    const mockResponse = {
      data: {
        voidTransaction: {
          id: '1',
          account_id: '1',
          amount: 3000,
          date: '2024-02-20',
          type: 'deposit',
          description: 'Large deposit',
          currency: 'EUR',
          current_balance: 1000
        }
      }
    };

    it('should delete transfer successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      await deleteTransferService(transferId);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.variables).toEqual({ id: transferId });
    });


    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Failed to delete transfer' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(deleteTransferService(transferId))
        .rejects.toThrow('Failed to delete transfer');
    });
  });

  describe('undoTransferService', () => {
    const transferId = '1';

    const mockResponse = {
      data: {
        undoTransaction: {
          id: '1',
          account_id: '1',
          amount: 3000,
          date: '2024-02-20',
          type: 'deposit',
          description: 'Large deposit',
          currency: 'EUR',
          current_balance: 1000
        }
      }
    };

    it('should undo transfer successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(mockResponse)
      });

      await undoTransferService(transferId);

      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-server.com',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.any(String)
        })
      );

      const body = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(body.variables).toEqual({ id: transferId });
    });

    it('should handle GraphQL errors', async () => {
      const graphqlError = {
        errors: [{ message: 'Failed to undo transfer' }]
      };

      mockFetch.mockResolvedValueOnce({
        json: () => Promise.resolve(graphqlError)
      });

      await expect(undoTransferService(transferId))
        .rejects.toThrow('Failed to undo transfer');
    });
  });
}); 