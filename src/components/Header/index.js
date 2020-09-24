import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function Header() {
  return (
    <div>
      <Navbar color="danger" dark expand="md">
        <NavbarBrand href="/">url shortener service</NavbarBrand>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/shorten">shorten url</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/metrics">short url metrics</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/upload">upload file</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;
