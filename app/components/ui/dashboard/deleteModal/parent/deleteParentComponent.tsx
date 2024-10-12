"use client"
import React, { useState } from "react";
import DeleteIcon from "@/data/public/DeleteIcon";
import DeleteModal from "@/app/components/ui/dashboard/deleteModal/deleteModal";

const DeleteParentComponent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        console.log("openModal вызван");
        setIsOpen(true);
    };
    const closeModal = () => {
        console.log("closeModal вызван");
        setIsOpen(false);
    };

    return (
        <div>
            <DeleteIcon onClick={openModal} />
            <DeleteModal isOpen={isOpen} onClose={closeModal} />
        </div>
    );
};

export default DeleteParentComponent;
