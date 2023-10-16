import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
      <div className="">
        {/* Hamburger Button Removed */}
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="px-4 nav-link" aria-current="page" to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
