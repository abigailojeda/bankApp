import React, { useState } from "react";
import { ActionButton } from "../../shared/components/ActionButton";
import { CopyIcon } from "../../shared/components/icons/CopyIcon";
import { DeleteIcon } from "../../shared/components/icons/DeleteIcon";
import { EditIcon } from "../../shared/components/icons/EditIcon";
import { UndoIcon } from "../../shared/components/icons/UndoIcon";
import { Modal } from "../../shared/components/Modal";
import { ConfirmationComponent } from "../../shared/components/ConfirmationComponent";

type ConfirmAction = "delete" | "undo" | "";

interface TransferItemActionsProps {
    setShowEditModal: (value: boolean) => void;
    setShowCopyModal: (value: boolean) => void;
    deleteTransfer: () => void;
    undoTransfer: () => void;
}

export const TransferItemActions: React.FC<TransferItemActionsProps> = ({ setShowEditModal, setShowCopyModal, undoTransfer, deleteTransfer }) => {
    const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; action: ConfirmAction }>({
        isOpen: false,
        action: "",
    });

    const handleConfirm = () => {
        if (confirmModal.action === "delete") {
            deleteTransfer();
        } else if (confirmModal.action === "undo") {
            undoTransfer();
        }
        setConfirmModal({ isOpen: false, action: "" });
    };

    const handleCloseModal = () => {
        setConfirmModal({ isOpen: false, action: "" });
    };

    return (
        <>
            {/* Undo Action */}
            <ActionButton
                color="text-subtitle"
                hoverColor="hover:text-subtitle/80"
                fontSize="text-sm"
                fontWeight="font-semibold"
                hasBackground={false}
                Icon={() => <UndoIcon width="22" height="22" />}
                click={() => setConfirmModal({ isOpen: true, action: "undo" })}
            />
            {/* Delete Action */}
            <ActionButton
                color="text-subtitle"
                hoverColor="hover:text-subtitle/80"
                fontSize="text-sm"
                fontWeight="font-semibold"
                hasBackground={false}
                Icon={() => <DeleteIcon width="22" height="22" />}
                click={() => setConfirmModal({ isOpen: true, action: "delete" })}
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

            {/* Confirm Modal */}
            {confirmModal.isOpen && (
                <Modal
                    isOpen={confirmModal.isOpen}
                    title={confirmModal.action === "delete" ? "Confirm Delete" : "Confirm Undo"}
                    onClose={handleCloseModal}
                    ChildComponent={() => (
                        <ConfirmationComponent
                            message={
                                confirmModal.action === "delete"
                                    ? "Are you sure you want to delete this transfer?"
                                    : "Are you sure you want to undo this transfer?"
                            }
                            onConfirm={handleConfirm}
                            onClose={handleCloseModal}
                        />
                    )}
                />
            )}
        </>
    );
};
