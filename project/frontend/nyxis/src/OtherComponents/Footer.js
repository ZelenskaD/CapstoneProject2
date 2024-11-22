import React from 'react';
import '../Styles/Footer.css'; // You can style the footer with this CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} All rights reserved</p>
                <p>Built by: Surganov.dev</p>
                <p>Contact Us: <a href="mailto:zelya2909@gmail.com"> zelya2909@gmail.com </a></p>

                <a href="https://www.linkedin.com/in/daria-surganov" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="icon" />
                </a>

                <a href="https://www.instagram.com/_zelenska_ya_" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className="icon" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;


