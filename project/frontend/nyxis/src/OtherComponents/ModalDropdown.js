import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/ModalDropdown.css'; // Optional custom styles

const ModalDropdown = ({ title, fetchItems, routePrefix }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uniqueItems = await fetchItems(); // Fetch items using the passed fetchItems function
                // Replace underscores with spaces and filter out null/undefined items
                const formattedItems = uniqueItems
                    .filter((item) => item) // Filter out falsy values (null, undefined, empty strings)
                    .map((item) => item.replace(/_/g, ' '));
                setItems(formattedItems);
            } catch (error) {
                    throw error;
            }
        };

        fetchData();
    }, [fetchItems]);

    // Toggle modal visibility
    const toggleModal = (isOpen) => {
        setIsModalOpen(isOpen);
    };

    return (
        <div
            className="modal-dropdown-wrapper"
            onMouseEnter={() => toggleModal(true)}
            onMouseLeave={() => toggleModal(false)}
        >
            <button className="dropdown-button">{title}</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>{title}</h4>
                        <div className="items-grid">
                            {items.map((item) => (
                                <NavLink
                                    key={item}
                                    to={`${routePrefix}/${item.replace(/ /g, '_')}`} // Convert spaces back to underscores for URLs
                                    className="item-link"
                                    onClick={() => toggleModal(false)}
                                >
                                    {item}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalDropdown;





