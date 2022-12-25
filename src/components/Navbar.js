import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbars">
        <div className="navbars-container">
          <Link to="/" className="navbars-logo" onClick={closeMobileMenu}>
            Saint Acutis Hospital
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/schedule"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Schedule
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-links" to="/">
                {button && (
                  <Button buttonStyle="button--outline">SIGN IN</Button>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
