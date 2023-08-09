import { NavLink } from 'react-router-dom';

export const Header = () => {

    return (
        <header className="header">
            <div className="logo" href="#">
                <p>LOGO</p>
            </div>
            <nav>
                <div>
                    <NavLink to="/">ALL PRODUCTS</NavLink>
                    <NavLink to="/forWomen">FOR WOMEN</NavLink>
                    <NavLink to="/forMen">FOR MEN</NavLink>
                    <NavLink to="/forKids">FOR KIDS</NavLink>
                </div>
            </nav>
        </ header>
    );
};
