import React, { useState } from 'react';

interface AddTransferModalProps {
  onClose: () => void;
  onAdd: (transferData: {
    amount: number;
    description: string;
    type: string;
    currency: string;
    accountId: string;
    date?: string;
  }) => void;
}

const AddTransferModal: React.FC<AddTransferModalProps> = ({ onClose, onAdd }) => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('transfer'); 
  const [currency, setCurrency] = useState('€');
  const [accountId, setAccountId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      amount,
      description,
      type,
      currency,
      accountId,
      date: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Transfer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Quantity:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Category:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border p-2"
            >
              <option value="withdrawal">Withdrawal</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block mb-1">Currency:</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-1">Account ID :</label>
            <input
              type="text"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full border p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransferModal;
