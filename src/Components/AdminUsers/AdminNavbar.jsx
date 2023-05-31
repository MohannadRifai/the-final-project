import React from 'react'
import './navbar.css'
import { FaTimes } from 'react-icons/fa'
import { useRef,useState , useEffect} from 'react';
import { Link } from "react-router-dom";
import menu from './hamburger.jpg';
import logo from './RoadCar.jpeg'
function Navbar() {

  const [scrollPosition, setScrollPosition] = useState(window.pageYOffset);

  // this var will refer to nav tag
  const navRef = useRef();

  //it called when click on buttons
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

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
        <Link to='/'><img className='navbar-lina-logo' src={logo} /></Link>

            <nav ref={navRef} className='navbar-lina-nav'>
        <Link to='/'  className="navbar-lina-nav-Links" href='#About'>Home</Link>
        <Link to='/AboutUs'  className="navbar-lina-nav-Links" href='#Languages'>About</Link>
        <Link to='/Cars'  className="navbar-lina-nav-Links" href='#Projects'>Cars</Link>
        <Link to='/ContactUs'  className="navbar-lina-nav-Links" href='#ContactSection'>Contact</Link>
        <Link to='/Login'  className="navbar-lina-nav-Links" href='#ContactSection'><button className='navbar-lina-login-btn'>Login</button></Link>

        <button
          className="navbar-lina-nav-btn-nav-close-btn"
          onClick={showNavbar}>
          <FaTimes />
        </button>

      </nav>
      {/* to open nav */}

<img className="navbar-lina-nav-btn" src={menu} alt=""  onClick={showNavbar} />
    </header>
  );
}

export default Navbar;