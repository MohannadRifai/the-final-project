import React from "react";
import "./navbar.css";
import { FaTimes } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import menu from "./hamburger.jpg";
import cryptoclub from "./cryptoclub.jpg";
function Navbar() {
  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  // this var will refer to nav tag
  const navRef = useRef();

  //it called when click on buttons
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar-lina ${scrollPosition > 0 ? "scrolled" : ""}`}>
      <NavLink to="/">
        {" "}
        <img className="navbar-lina-logo" src={cryptoclub} alt="logo" />
      </NavLink>

      <nav ref={navRef} className="navbar-lina-nav">
  <NavLink
    exact
    to="/"
    className="navbar-lina-nav-Links"
    activeClassName="active"
  >
    Home
  </NavLink>
  <NavLink
    to="/AboutUs"
    className="navbar-lina-nav-Links"
    activeClassName="active"
  >
    About
  </NavLink>
  <NavLink
    to="/Courses"
    className="navbar-lina-nav-Links"
    activeClassName="active"
  >
    Courses
  </NavLink>
  <NavLink
    to="/ContactUs"
    className="navbar-lina-nav-Links"
    activeClassName="active"
  >
    Contact
  </NavLink>
  <NavLink
    to="/Login"
    className="navbar-lina-nav-Links"
    activeClassName="active"
  >
    <button className="navbar-lina-login-btn">Login</button>
  </NavLink>

  <button
    className="navbar-lina-nav-btn-nav-close-btn"
    onClick={showNavbar}
  >
    <FaTimes />
  </button>
</nav>
      {/* to open nav */}

      <img
        className="navbar-lina-nav-btn"
        src={menu}
        alt=""
        onClick={showNavbar}
      />
    </header>
  );
}

export default Navbar;
