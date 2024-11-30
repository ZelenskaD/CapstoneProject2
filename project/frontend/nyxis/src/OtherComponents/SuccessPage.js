import React, { useState, useEffect } from 'react';
import SuccessModal from './SuccessModal';  // Import SuccessModal component

const SuccessPage = () => {
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
            <SuccessModal show={showModal} toggle={toggleModal} />
        </div>
    );
};

export default SuccessPage;
