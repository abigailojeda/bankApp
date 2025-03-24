import { PaginatorProps } from "../types/Paginator.types"

export const Paginator: React.FC<PaginatorProps> = ({
    currentPage,
    setCurrentPage,
    totalPages
}) => {
    return (
        <div className="flex justify-center text-text items-center gap-2  text-sm pt-4 border-t border-gray dark:border-bg footer-style">
            <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray/80 dark:bg-secondary/80 disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-sm">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray/80 dark:bg-secondary/80 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}
