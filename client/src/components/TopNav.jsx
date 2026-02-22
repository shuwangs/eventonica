import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./TopNav.css";
const TopNav = () => {
  return (
    <Navbar className="top-nav">
      <Navbar.Brand className="brand" href="#">
        🌸 EventHub
      </Navbar.Brand>

      <Nav className="nav-links">
        <NavLink to="/admin" className="nav-link">
          Admin
        </NavLink>
        <NavLink to="/user" className="nav-link">
          User
        </NavLink>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
