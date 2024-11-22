import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/ModalDropdown.css'; // Optional custom styles
import NyxisApi from '../api'; // Make sure this import points to the correct path


const ModalDropdown = ({ title, fetchItems, routePrefix }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uniqueItems = await fetchItems(); // Fetch items using the passed fetchItems function
                setItems(uniqueItems);
            } catch (error) {
                console.error("Error fetching items:", error);
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
            <button className="dropdown-button">
                {title}
            </button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>{title}</h4>
                        <div className="items-grid">
                            {items.map((item) => (
                                <NavLink
                                    key={item}
                                    to={`${routePrefix}/${item}`}
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




