import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <Navbar id="header__nav" bg="dark" variant="dark">
            <Navbar.Brand href="/">Orders</Navbar.Brand>
        </Navbar>
    )
}

export default Header
