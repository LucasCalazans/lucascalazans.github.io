import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav>
                    <ul className="main-menu">
                        <li className="main-menu-item">LC | Front-end Developer</li>
                        <li className="main-menu-item">about</li>
                        <li className="main-menu-item">projects</li>
                        <li className="main-menu-item">social</li>
                        <li className="main-menu-item">contact</li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;