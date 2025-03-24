import React from "react";
import { ActionButton } from "../../shared/components/ActionButton";
import { CopyIcon } from "../../shared/components/icons/CopyIcon";
import { DeleteIcon } from "../../shared/components/icons/DeleteIcon";
import { EditIcon } from "../../shared/components/icons/EditIcon";
import { UndoIcon } from "../../shared/components/icons/UndoIcon";

interface TransferItemActionsProps {
    setShowEditModal: (show: boolean) => void;
    setShowCopyModal: (show: boolean) => void;
    deleteTransfer: () => void;
    undoTransfer: () => void;
    transfer: {
        amount: string;
        type: string;
        description: string;
    };
    shouldShowUndoButton: boolean;
}

export const TransferItemActions: React.FC<TransferItemActionsProps> = ({ setShowEditModal, setShowCopyModal, undoTransfer, deleteTransfer, shouldShowUndoButton }) => {
    return (
        <>
            {(shouldShowUndoButton) && (
                /* Undo Action */
                <ActionButton
                    color="text-subtitle"
                    hoverColor="hover:text-subtitle/80"
                    fontSize="text-sm"
                    fontWeight="font-semibold"
                    hasBackground={false}
                    Icon={() => <UndoIcon width="22" height="22" />}
                    click={undoTransfer}
                />
            )}
            {/* Delete Action */}
            <ActionButton
                color="text-subtitle"
                hoverColor="hover:text-subtitle/80"
                fontSize="text-sm"
                fontWeight="font-semibold"
                hasBackground={false}
                Icon={() => <DeleteIcon width="22" height="22" />}
                click={deleteTransfer}
            />
            {/* Edit Action */}
            <ActionButton
                color="text-subtitle"
                hoverColor="hover:text-subtitle/80"
                fontSize="text-sm"
                fontWeight="font-semibold"
                hasBackground={false}
                Icon={() => <EditIcon width="22" height="22" />}
                click={() => setShowEditModal(true)}
            />
            {/* Copy Action */}
            <ActionButton
                color="text-subtitle"
                hoverColor="hover:text-subtitle/80"
                fontSize="text-sm"
                fontWeight="font-semibold"
                hasBackground={false}
                Icon={() => <CopyIcon width="22" height="22" />}
                click={() => setShowCopyModal(true)}
            />
        </>
    );
};