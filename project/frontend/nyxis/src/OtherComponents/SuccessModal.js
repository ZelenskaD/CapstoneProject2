import React, {  useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import "../Styles/SuccessModal.css"
import { useNavigate } from 'react-router-dom';

const SuccessModal = ({ show, toggle }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Close the modal and redirect to the home page or other route
    const handleClose = () => {
        toggle();  // Close the modal
        navigate('/');  // Redirect to the home page (or any other page you'd like)
    };

    useEffect(() => {
        if (show) {
            // Ensure modal is visible when the 'show' prop is true
            document.body.style.overflow = 'hidden';  // Prevent scrolling when modal is open
        } else {
            document.body.style.overflow = '';  // Re-enable scrolling
        }
    }, [show]);

    return (
        <Modal isOpen={show} toggle={toggle} centered size="md" className="success-modal">
            <ModalBody className="success-modal-body">
                <h4 className="success-modal-title">Thank you for your order!</h4>
                <p className="success-modal-description">
                    Your order has been successfully placed. We will notify you when it's shipped.
                </p>
            </ModalBody>
            <ModalFooter className="success-modal-footer">
                <Button color="primary" onClick={handleClose} className="success-modal-btn">Go to Home</Button>
            </ModalFooter>
        </Modal>
    );
};

export default SuccessModal;
