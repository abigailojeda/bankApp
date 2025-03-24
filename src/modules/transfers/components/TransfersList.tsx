import { useContext, useState, useEffect } from 'react';
import { TransferContext } from '../states/TransferContext';
import { AccountContext } from '../../account/states/AccountContext';
import TransferItem from './TransferItem';
import { Modal } from '../../shared/components/Modal';
import { FormComponent } from '../../shared/components/forms/FormComponent';
import { TransferAddForm, transferFormFields } from '../types/transfer.types';
import { ActionButton } from '../../shared/components/ActionButton';
import { TransferIcon } from '../../shared/components/icons/TransferIcon';
import { formatStringNumber, parseDate } from '../../shared/helpers/formatter';
import { validateTransaction } from '../utils/validationUtils';
import RealtimeTransferNotifier from './RealtimeTransferNotifier';
import { Paginator } from '../../shared/components/Paginator';
import { TransferListLoading } from './TransferListLoading';
import TransferCSV from './TransferCSV';
import { InputDate } from '../../shared/components/forms/InputDate';

const ITEMS_PER_PAGE = 20;

export const TransfersList = () => {
    const { transfers, loading, addTransfer } = useContext(TransferContext);
    const { currentAccount, currentBalance } = useContext(AccountContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterType, setFilterType] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');


    const filteredTransfers = transfers.filter(transfer => {
        const matchesType = filterType === 'all' || transfer.type === filterType;
        const matchesSearch = transfer.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesDate = true;
        const transferDate = parseDate(transfer.date);
        const fromDate = parseDate(dateFrom);
        const toDate = parseDate(dateTo);
        if (fromDate && transferDate && transferDate < fromDate) {
            matchesDate = false;
        }
        if (toDate && transferDate && transferDate > toDate) {
            matchesDate = false;
        }
        return matchesType && matchesSearch && matchesDate;
    });

    const totalPages = Math.ceil(filteredTransfers.length / ITEMS_PER_PAGE);
    const paginatedTransfers = filteredTransfers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset page when any filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterType, searchQuery, dateFrom, dateTo]);

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

    return (
        <>
            {loading ? (
                <TransferListLoading />
            ) : (
                <div className="page-container">
                    <div className="card-style bg-bg shadow-none sm:w-full pt-0 h-[calc(100vh-150px)] ">
                        <RealtimeTransferNotifier />

                        {/* Header section */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl text-text font-semibold">Transactions</h2>

                            <div className="flex items-center gap-x-4">
                                {/* Add Transfer action */}
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
                                <TransferCSV />
                            </div>
                        </div>

                        {/* Filters section */}
                        <div className="flex sm:flex-row flex-col gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-style mt-2 h-[40px] bg-white dark:bg-primary"
                            />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="input-style mt-2 h-[40px] bg-white dark:bg-primary"
                            >
                                <option value="all">All Types</option>
                                <option value="deposit">Deposits</option>
                                <option value="withdrawal">Withdrawals</option>
                                <option value="reversal">Canceled</option>
                            </select>
                            {/* New date filters */}
                            <InputDate
                                name="dateFrom"
                                value={dateFrom}
                                placeholder="From (dd/mm/yyyy)"
                                onChange={(e) => setDateFrom(e.target.value)}
                                backgroundColor=" bg-white dark:bg-primary"
                            />
                            <InputDate
                                name="dateTo"
                                value={dateTo}
                                placeholder="To (dd/mm/yyyy)"
                                onChange={(e) => setDateTo(e.target.value)}
                                backgroundColor="bg-white dark:bg-primary"

                            />
                        </div>

                        {/* Transfers list */}
                        <div className="space-y-4 sm:h-[calc(100%-120px)] sm:mb-0 pb-16 overflow-y-auto">
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
                            <Paginator
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        )}
                    </div>

                    {/* Add Transfer Modal */}
                    {isModalOpen && (
                        <Modal
                            title="Add Transfer"
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            ChildComponent={(props) => (
                                <FormComponent
                                    {...props}
                                    fields={transferFormFields}
                                    initialValues={transferInitialValues}
                                    onSubmit={handleAddTransfer}
                                    onClose={() => setIsModalOpen(false)}
                                    validate={(values) =>
                                        validateTransaction(values, currentBalance, currentAccount, 'add')
                                    }
                                />
                            )}
                        />
                    )}
                </div>
            )}
        </>
    );
};
