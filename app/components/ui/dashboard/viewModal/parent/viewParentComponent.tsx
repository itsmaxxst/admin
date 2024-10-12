"use client"
import React, { useState } from "react";
import EyeIcon from "@/data/public/EyeIcon";
import ViewModal from "@/app/components/ui/dashboard/viewModal/viewModal";

const ViewParentComponent: React.FC = () => {
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
            <EyeIcon onClick={openModal} />
            <ViewModal isOpen={isOpen} onClose={closeModal} />
        </div>
    );
};

export default ViewParentComponent;
