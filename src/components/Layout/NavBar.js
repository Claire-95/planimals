import { Outlet } from "react-router-dom";
import classes from "./NavBar.module.css";
import loginService from "../../services/login-service";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [navRef, setNavRef] = useState(classes.closed);

  const showNavBar = () => {
    if (navRef === classes.closed) {
      setNavRef(classes.open);
    } else {
      setNavRef(classes.closed);
    }
  };

  return (
    <div>
      <header>
        <h3>Planimals</h3>
        <nav className={navRef}>
          <a href="/all-pets">All Pets</a>
          <a href="/new-pet">Add New Pet</a>
          <a href="/fed-pets">Fed Pets</a>
          <button
            onClick={() => {
              var loginState = false;
              loginService.HandleLogin(loginState);
            }}
          >
            Sign Out
          </button>
          <button className={classes.navBtn} onClick={showNavBar}>
            <FaTimes />
          </button>
        </nav>
        <button className={classes.navBtn} onClick={showNavBar}>
          <FaBars />
        </button>
      </header>
      <Outlet />
    </div>
  );
};

export default NavBar;
