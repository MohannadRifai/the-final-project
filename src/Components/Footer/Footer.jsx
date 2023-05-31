import React from "react";
// import axios from "axios";
import "./Footer.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Footer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="bibi">
          <h6>Follow us</h6>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            maxWidth: "162px",
            maxHeight: "50px",
          }}
          align="center"
        >
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon
              icon={faFacebook}
              className="fa-lg white-text mr-md-5 mr-3 fa-2x"
            />
          </a>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="fa-lg white-text mr-md-5 mr-3 fa-2x"
            />
          </a>
          <a href="https://www.linkedin.com/">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="fa-lg white-text mr-md-5 mr-3 fa-2x"
            />
          </a>
         
        </div>
        <div style={{ background: "black" }}>
          <p
            style={{ color: "#91BEC2", padding: "15px 0", marginBottom: "0" }}
            align="center"
          >
            &copy; 2023 Copyright:
            <a href="mailto:Coditech@gmail.com">Created By: CodiTech</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
