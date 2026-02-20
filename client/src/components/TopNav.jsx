import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const TopNav = () => {
  return (
    <Navbar className="top-nav" >
        <Navbar.Brand href="#" >EventHub</Navbar.Brand>

        <Nav>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
            <NavLink to="/user" className="nav-link">User</NavLink>
        </Nav>
    </Navbar>
    );
};

export default TopNav;