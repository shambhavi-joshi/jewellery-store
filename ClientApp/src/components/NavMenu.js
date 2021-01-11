import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    userId() {
        return localStorage.getItem("user_id");
    }

    userType() {
        return localStorage.getItem("user_type");
    }

    handleLogout() {
        localStorage.clear();
        window.location = '/login';
    }

    render() {
        let navItems, userTypeItem;
        userTypeItem = this.userType() == "2" ? "Privileged User" : "Normal User";

        if (this.userId()) {
            navItems = <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                    <NavItem>
                        Welcome {userTypeItem}
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/#" onClick={this.handleLogout}>Log Out</NavLink>
                    </NavItem>
                </ul>
            </Collapse>
        }

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Jewellery Management App</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        {navItems}
                    </Container>
                </Navbar>
            </header>
        );
    }
}
