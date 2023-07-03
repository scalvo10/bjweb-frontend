import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import Logout from '../../pages/Forms/Logout';

function Navbar() {
    const { token } = useContext(AuthContext);
    return (
      <header>
          <nav className="navbar">
              <ul className="navbar-links-container">
                  <li className="navbar-element">
                      <NavLink to="/" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                          Home
                      </NavLink>
                  </li>
                  <li className="navbar-element"> 
                      <NavLink to="about-us" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                          About Us
                      </NavLink>
                  </li>
                  <li className="navbar-element"> 
                      <NavLink to="principal" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Homepage
                      </NavLink>
                  </li>
                  <li className="navbar-element"> 
                      <NavLink to="reglas" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Rules
                      </NavLink>
                  </li>
              </ul>
              <ul className="navbar-links-container">
                  <li className="navbar-element">
                  {token === null && (
                        <NavLink to="log-in" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                          Log In
                        </NavLink>
                    )}
                  {token !== null && (
                        <Logout />
                    )}
                  </li>
                  {token === null && (
                    <li className="navbar-element"> 
                        <NavLink to="register" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                            Register
                        </NavLink>
                    </li>
                    )}
              </ul>
          </nav>
      </header>
    )
  }
  
  export default Navbar;