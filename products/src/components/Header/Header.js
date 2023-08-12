import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="logo" href="#">
                <p>LOGO</p>
            </div>
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                <div className="navbar">
                    <NavLink to="/" onClick={toggleMenu}>ALL PRODUCTS</NavLink>
                    <NavLink to="/forWomen" onClick={toggleMenu}>FOR WOMEN</NavLink>
                    <NavLink to="/forMen" onClick={toggleMenu}>FOR MEN</NavLink>
                    <NavLink to="/forKids" onClick={toggleMenu}>FOR KIDS</NavLink>
                </div>
            </nav>
            <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"><i className="fas fa-bars"></i></div>
            </div>
        </header>
    );
};
