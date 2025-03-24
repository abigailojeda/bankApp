import { useContext, useState, useEffect } from 'react';
import { TransferContext } from '../states/TransferContext';
import { AccountContext } from '../../account/states/AccountContext';
import TransferItem from './TransferItem';
import { Modal } from '../../shared/components/Modal';
import { FormComponent } from '../../shared/components/forms/FormComponent';
import { TransferAddForm, transferFormFields } from '../types/transfer.types';
import { ActionButton } from '../../shared/components/ActionButton';
import { TransferIcon } from '../../shared/components/icons/TransferIcon';
import { formatStringNumber } from '../../shared/helpers/formatter';
import { validateTransaction } from '../utils/validationUtils';
import RealtimeTransferNotifier from './RealtimeTransferNotifier';

const ITEMS_PER_PAGE = 20;

export const TransfersList = () => {
    const { transfers, loading, error, addTransfer } = useContext(TransferContext);
    const { currentAccount, currentBalance } = useContext(AccountContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTransfers = transfers.filter(transfer => {
        const matchesType = filterType === 'all' || transfer.type === filterType;
        const matchesSearch = transfer.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const totalPages = Math.ceil(filteredTransfers.length / ITEMS_PER_PAGE);
    const paginatedTransfers = filteredTransfers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [filterType, searchQuery]);

    const handleAddTransfer = async (values: Record<string, string | number>) => {
        if (!currentAccount) return;
        
        const formattedValues: TransferAddForm = {
            ...values,
            amount: formatStringNumber(values.amount),
            accountId: currentAccount.id,
            type: String(values.type) || '',
            description: String(values.description) || '',
        };

        try {
            await addTransfer(formattedValues);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error adding transfer:', err);
        }
    };

    const transferInitialValues = {
        title: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="page-container">
            <div className='card-style'>
                <RealtimeTransferNotifier />
                
                {/* Header section */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl text-text font-semibold">Transactions</h2>
                    <ActionButton
                        color="text-subtitle"
                        fontSize="text-sm"
                        fontWeight="font-semibold"
                        hasBackground={true}
                        backgroundColor='bg-gray'
                        rounded={true}
                        Icon={() => <TransferIcon width="22" height="22" />}
                        hoverBackgroundColor="hover:bg-gray/90"
                        width='w-8'
                        height='h-8'
                        click={() => setIsModalOpen(true)}
                    />
                </div>

                {/* Filters section */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 p-2 rounded-md border border-gray dark:border-bg bg-white dark:bg-primary"
                    />
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="p-2 rounded-md border border-gray dark:border-bg bg-white dark:bg-primary"
                    >
                        <option value="all">All Types</option>
                        <option value="deposit">Deposits</option>
                        <option value="withdrawal">Withdrawals</option>
                        <option value="reversal">Canceled</option>
                    </select>
                </div>

                {/* Transfers list */}
                <div className="space-y-4">
                    {paginatedTransfers.map((transfer, index) => (
                        <TransferItem
                            key={transfer.id}
                            transfer={transfer}
                            isLast={index === 0}
                        />
                    ))}
                </div>

                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-gray dark:border-bg">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray/20 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md bg-gray/20 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Add Transfer Modal */}
            {isModalOpen && (
                <Modal
                    title='Add Transfer'
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    ChildComponent={(props) => <FormComponent {...props} 
                        fields={transferFormFields} 
                        initialValues={transferInitialValues}
                        onSubmit={handleAddTransfer} 
                        onClose={() => setIsModalOpen(false)} 
                        validate={(values) => validateTransaction(values, currentBalance, currentAccount, 'add')}
                    />}
                />
            )}
        </div>
    );
};