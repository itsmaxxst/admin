import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import styles from "@/app/components/ui/dashboard/viewModal/viewModal.module.css"

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            isOpen={isOpen}
            onClose={onClose}
            backdrop={"blur"}
            classNames={{
                base: styles.base,
            }}
        >
            <ModalContent>
                <ModalHeader className={`flex flex-col gap-1 ${styles.title}`} >View Details</ModalHeader>
                <ModalBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ViewModal;
