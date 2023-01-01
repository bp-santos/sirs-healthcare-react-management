import React, { useState, useEffect } from "react";
import { Button } from "./Button";
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
  var port = window.location.port;

  return (
    <>
      <nav className="navbars">
        <div className="navbars-container">
          <a
            href="http://localhost:3000"
            className="navbars-logo"
            onClick={closeMobileMenu}
          >
            Saint Acutis Hospital
          </a>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <a
                href="/schedule"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Schedule
              </a>
            </li>
            <li className="nav-item">
              <a
                href="/"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Sign In
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-links" href="/">
                {button && (
                  <Button buttonStyle="button--outline">SIGN IN</Button>
                )}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
