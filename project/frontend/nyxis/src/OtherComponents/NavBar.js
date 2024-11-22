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

function NavBar({ logout, cart = [], toggleCartOpen, onSearch, favorites = []  }) {
    const { currentUser } = useContext(UserContext);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
    }, [cart]);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchQuery);  // Call the parent search handler
        setSearchQuery('');
        setIsSearchOpen(false);  // Close the search bar after submitting
    };

    return (
        <Navbar expand="sm" className="navbar-custom">
            <div className="nav-container">
                <NavItem className="brand-name">
                    <NavLink to="/" className="nav-link">Nyxis</NavLink>
                </NavItem>

                <Button className="navbar-toggler" onClick={toggleNav}>
                    <FontAwesomeIcon icon={faBars} />
                </Button>

                <Nav className={`nav-items ${isNavOpen ? "open" : ""}`}>
                    <NavItem className="nav-item">
                        <NavLink to="/new" className="nav-link">New</NavLink>
                    </NavItem>

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

                    <NavItem className="nav-item">
                        <NavLink to="/favorites" className="nav-link">
                            <FontAwesomeIcon icon={faHeart} />
                        </NavLink>
                    </NavItem>

                    <NavItem className="nav-item">
                        <div className="cart-icon-wrapper">
                            <NavLink to="#" className="nav-link" onClick={toggleCartOpen}>
                                <FontAwesomeIcon icon={faBagShopping} />
                                <span className="badge-circle">({cartCount})</span>
                            </NavLink>
                        </div>
                    </NavItem>

                    {/* Search icon for mobile */}
                    <NavItem className="nav-item search-icon-wrapper">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleSearchClick} />
                    </NavItem>

                    {/* Display search bar when search icon is clicked */}
                    {isSearchOpen && (
                        <form onSubmit={handleSearchSubmit} className="search-bar show">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                className="search-input"
                            />
                            <button type="submit" className="search-submit-btn">Search</button>
                        </form>
                    )}

                    {currentUser ? (
                        <NavItem className="nav-item">
                            <NavLink to="/" onClick={logout} className="nav-link">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} /> {currentUser.firstName || currentUser.username}
                            </NavLink>
                        </NavItem>
                    ) : (
                        <NavItem className="nav-item">
                            <NavLink to="/login" className="nav-link">
                                <FontAwesomeIcon icon={faUserPlus} /> Login
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
            </div>
        </Navbar>
    );
}

export default NavBar;























