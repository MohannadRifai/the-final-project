import React from "react";
import "./navbar.css";
import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import menu from "./hamburger.jpg";
import logo from "./RoadCar.jpeg";
import cryptoclub from "./cryptoclub.jpg";


function AdminNavbar() {
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

  const logOut = () => {
    window.location.href = "/";
    window.sessionStorage.clear();
    sessionStorage.removeItem("token");
  };

  return (
    <header className={`navbar-lina ${scrollPosition > 0 ? "scrolled" : ""}`}>
      <NavLink to="/Admin/Home">
        <img className="navbar-lina-logo" alt="a" src={cryptoclub} />
      </NavLink>

      <nav ref={navRef} className="navbar-lina-nav">
        <NavLink
          to="/Admin/Home"
          className="navbar-lina-nav-Links"
          activeClassName="active"
        >
          Home
        </NavLink>
        <NavLink
          to="/Admin/AboutUs"
          className="navbar-lina-nav-Links"
          activeClassName="active"
        >
          About
        </NavLink>
        <div className="dropdown">
          <NavLink
            to="/Admin/cars"
            className="navbar-lina-nav-Links dropdown-toggle"
          >
            Courses
          </NavLink>
          <div className="dropdown-content">
            <NavLink to="/reservations">Reservations</NavLink>
          </div>


        </div>    
        
        
        <div className="dropdown">
          <NavLink
            to="/ContactUsAdmin"
            className="navbar-lina-nav-Links dropdown-toggle"
          >
            Contact
          </NavLink>
          <div className="dropdown-content">
            <NavLink to="/clientmessages">Messages</NavLink>
          </div>
        </div>

        <NavLink
          to="/users"
          className="navbar-lina-nav-Links"
          href="#ContactSection"
          activeClassName="active"
        >
                  Users
        </NavLink>
        <button
          className="kanj"
          onClick={logOut}
          style={{
            backgroundColor: "#f44336",
            color: "white",
            fontSize: "16px",
            padding: "8px 16px",
            border: "none",
            borderRadius: "15px",
            cursor: "pointer",
          }}
        >
          Logout
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

export default AdminNavbar;
