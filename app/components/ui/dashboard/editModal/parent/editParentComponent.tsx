"use client"
import React, { useState } from "react";
import EditIcon from "@/data/public/EditIcon";
import EditModal from "@/app/components/ui/dashboard/editModal/editModal";

const EditParentComponent: React.FC = () => {
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
            <EditIcon onClick={openModal} />
            <EditModal isOpen={isOpen} onClose={closeModal} />
        </div>
    );
};

export default EditParentComponent;
