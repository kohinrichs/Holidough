import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
    const { isLoggedIn, isAdmin, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/">Holidough</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn && isAdmin &&
                            (<>
                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/orders">
                                        Orders
                                    </NavLink>
                                </NavItem>

                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/productionnumbers">
                                        Production Numbers
                                    </NavLink>
                                </NavItem>

                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/customers">
                                        Customers
                                    </NavLink>
                                </NavItem>

                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/items">
                                        Items
                                    </NavLink>
                                </NavItem>

                                <NavItem style={{ margin: '0 2em' }}>
                                    <NavLink tag={RRNavLink} to="/holidays">
                                        Holidays
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}><i class="fas fa-sign-out-alt"></i></a>
                                </NavItem>
                            </>)
                        }
                        {isLoggedIn && !isAdmin &&
                            (<>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}><i class="fas fa-sign-out-alt"></i></a>
                                </NavItem>
                            </>)
                        }
                        {!isLoggedIn && (
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    {/* <Nav navbar>
                        <NavItem>
                            <a aria-current="page" className="nav-link"
                                href="https://www.youtube.com/watch?v=3N_ywhx6_K0"
                                target="_new">Grace Hopper on Letterman</a>
                        </NavItem>
                    </Nav> */}
                </Collapse>
            </Navbar>
        </div >
    );
}
