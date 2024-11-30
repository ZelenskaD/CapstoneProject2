import React, { useState, useEffect } from 'react';
import CancelModal from './CancelModal';  // Import CancelModal component

const CancelPage = () => {
    const [showModal, setShowModal] = useState(false);

    // Trigger the modal after the component mounts (on page load)
    useEffect(() => {
        setShowModal(true);
    }, []);

    // Toggle the modal state
    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="success-page">
            {/* Render the SuccessModal with show as a prop */}
            <CancelModal show={showModal} toggle={toggleModal} />
        </div>
    );
};

export default CancelPage;