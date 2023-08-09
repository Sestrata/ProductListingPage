import { NavLink } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer>
            <NavLink to="/forKids">T&C</NavLink>
            <NavLink to="/privacyPolicy"> Privacy Policy</NavLink>
            <NavLink to="/contactUs">Contact Us</NavLink>
            <p>© Designed by <b>Elena Yaneva</b></p>
        </footer>
    );
};