import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import UserContext from "./UserContext";
import ModalDropdown from "./ModalDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserPlus,
    faArrowRightFromBracket,
    faBars,
    faBagShopping,
    faSearch,
    faHeart
} from '@fortawesome/free-solid-svg-icons';
import "../Styles/NavBar.css";
import NyxisApi from "../api";




function NavBar({ logout, cart = [], toggleCartOpen, onSearch, favorites = [], toggleFavoritesOpen }) {
    const { currentUser } = useContext(UserContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false); // Add loading state
    const [error, setError] = useState(null);

    // Update cart count when the cart changes
    useEffect(() => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
    }, [cart]);

    // Toggle navigation menu
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };




    return (
        <Navbar expand="sm" className="navbar-custom">
            <div className="nav-container">
                <NavItem className="brand-name">
                    <NavLink to="/" className="nav-link">Nyxis</NavLink>
                </NavItem>

                {/* Hamburger Icon for Mobile View */}
                <Button className="navbar-toggler" onClick={toggleNav}>
                    <FontAwesomeIcon icon={faBars} />
                </Button>

                <Nav className={`nav-items ${isNavOpen ? "open" : ""}`}>

                    <NavItem className="nav-item">
                        <ModalDropdown
                            title="Makeup"
                            fetchItems={NyxisApi.getProductTypeNames}
                            routePrefix="/makeup/product_type"
                        />
                    </NavItem>

                    <NavItem className="nav-item">
                        <ModalDropdown
                            title="Brands"
                            fetchItems={NyxisApi.getBrandNames}
                            routePrefix="/makeup/brands"
                        />
                    </NavItem>

                    {/* Favorites Icon */}
                    <NavItem className="nav-item">
                        <div className="favorites-icon-wrapper">
                            <NavLink to="#" className="nav-link" onClick={toggleFavoritesOpen}>
                                <FontAwesomeIcon icon={faHeart} />
                            </NavLink>
                        </div>
                    </NavItem>

                    {/* Cart Icon */}
                    <NavItem className="nav-item">
                        <div className="cart-icon-wrapper">
                            <NavLink to="#" className="nav-link" onClick={toggleCartOpen}>
                                <FontAwesomeIcon icon={faBagShopping} />
                                <span className="badge-circle">({cartCount})</span>
                            </NavLink>
                        </div>
                    </NavItem>

                    {/* User-specific Navigation Links */}
                    {currentUser ? (
                        <NavItem className="nav-item-username">

                                 {currentUser.firstName || currentUser.username}

                        </NavItem>
                    ) : (
                        <>
                            <NavItem className="nav-item">
                                <NavLink to="/signup" className="nav-link">
                                    <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                                </NavLink>
                            </NavItem>

                            <NavItem className="nav-item">
                                <NavLink to="/login" className="nav-link">
                                     Login
                                </NavLink>
                            </NavItem>
                        </>
                    )}

                    {/* Logout or Login based on user authentication */}
                    {currentUser ? (
                        <NavItem className="nav-item">
                            <NavLink to="/" onClick={logout} className="nav-link">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                            </NavLink>
                        </NavItem>
                    ) : null}

                </Nav>
            </div>
        </Navbar>
    );
}

export default NavBar;


























