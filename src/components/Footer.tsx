import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div>
                <Link to = "/stations" className = 'footer-link'>Stations</Link>
            </div>
            <div>
                <Link to = "/countries" className = 'footer-link'>Countries</Link>
            </div>
            <div>
                <Link to = "/fares" className = 'footer-link'>Fares</Link>
            </div>
        </footer>
    );
};
export default Footer;