import React, { useState, useEffect, useRef } from "react";
import "../ContactUs/ContactUs.css"; // <-- Import the CSS file
import phoneIcon from "../../assets/kindpng_3406718.png";
import emailIcon from "../../assets/emailIcon.png";
import houseIcon from "../../assets/houseIcon.png";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ContactAdminForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [streetLocation, updateLocation] = useState("");
  const [adminEmail, updateEmail] = useState("");
  const [adminPhoneNumber, updatePhoneNumber] = useState("");
  const [ setContact] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [ setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const fetchContact = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://final-project-backend-production-20f3.up.railway.app/api/contactAdmin/getOne"
      );
      const data = await response.json();
      console.log("admin contact info", data);
      setContact(data);
      updatePhoneNumber(data.adminPhoneNumber);
      updateEmail(data.adminEmail);
      updateLocation(data.streetLocation);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (!sessionStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    } else {
      fetchContact();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all form fields are filled out
    if (!name || !email || !phoneNumber || !message) {
      setSubmitStatus(
        <span style={{ color: "red" }}>Please fill out all fields.</span>
      );
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus(
        <span style={{ color: "red" }}>
          Please enter a valid email address.
        </span>
      );
      return;
    }
    if (!/^\d+$/.test(phoneNumber)) {
      setSubmitStatus(
        <span style={{ color: "red" }}>Please enter a valid phone number.</span>
      );
      return;
    }
    try {
      const response = await fetch(
        "https://final-project-backend-production-20f3.up.railway.app/api/contact/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, phoneNumber, message }),
        }
      );
      const data = await response.json();
      console.log(data);
      // Display success message and error message
      setSubmitStatus(
        <span style={{ color: "green" }}>
          Success! Your message has been sent.
        </span>
      );
    } catch (error) {
      console.error(error);
      setSubmitStatus(
        <span style={{ color: "red" }}>
          Error! There was an issue submitting your message.
        </span>
      );
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Check if all form fields are filled out

    try {
      const response = await fetch(
        "https://final-project-backend-production-20f3.up.railway.app/api/contactAdmin/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            adminEmail,
            adminPhoneNumber,
            streetLocation,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      // Display success message and error message
      setUpdateStatus(
        <span style={{ color: "green" }}>
          Success! Your contact-info has been updated!.
        </span>
      );
    } catch (error) {
      console.error(error);
      setUpdateStatus(
        <span style={{ color: "red" }}>
          Error! There was an issue updating.
        </span>
      );
    }
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gg4wxis",
        "template_0efkpj5",
        form.current,
        "KoYDxQnMSIaCkMjHr"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendEmail(e);
    handleSubmit(e);
  };

  return (
    <div className="all-contactUs-space">
      <div className="contact-us">
        <div className="contact-info-admin">
          <h1 className="contact-info-title">Need additional information?</h1>
          <br />
          <br />
          <p className="contact-info-p">
            We're here to help! If you have any questions or need further
            information, feel free to reach out to us. Our team is ready to
            assist you.
          </p>

          <form onSubmit={handleUpdate}>
            <ul>
              <li className="contact-info-list-admin">
                <p className="phone-number">
                  {" "}
                  <img
                    className="phone-img"
                    src={phoneIcon}
                    alt="icon 1"
                  />{" "}
                  <input
                    className="update-info"
                    type="text"
                    value={adminPhoneNumber}
                    onChange={(e) => updatePhoneNumber(e.target.value)}
                  />
                </p>
                <p className="email">
                  {" "}
                  <img
                    className="email-img"
                    src={emailIcon}
                    alt="icon 2"
                  />{" "}
                  <input
                    className="update-info"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => updateEmail(e.target.value)}
                  />
                </p>
                <p className="location">
                  {" "}
                  <img
                    className="house-img"
                    src={houseIcon}
                    alt="icon 3"
                  />{" "}
                  <input
                    className="update-info"
                    type="text"
                    value={streetLocation}
                    onChange={(e) => updateLocation(e.target.value)}
                  />
                </p>
                <button type="submit" className="form-button">
                  Update
                </button>
                {updateStatus && <p>{updateStatus}</p>}
              </li>
            </ul>
          </form>
        </div>

        <div className="contact-form">
          <h2 className="contact-form-title">Get in touch</h2>
          <p className="contact-form-p">
            Reach out to us to inquire about any specific details or assistance
            you may need in making your selection.
          </p>
          {submitStatus && <p>{submitStatus}</p>}

          <form ref={form} onSubmit={handleFormSubmit} class="form">
            <div class="form-group">
              <label class="form-label">
                <input
                  type="text"
                  class="form-input"
                  placeholder="your name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  readOnly
                />
              </label>
            </div>
            <div className="email-phoneNumber">
              <div class="form-group-email">
                <label class="form-label">
                  <input
                    type="email"
                    class="form-input-email-phoneNumber"
                    placeholder="your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    readOnly
                  />
                </label>
              </div>

              <div class="form-group-phoneNumber">
                <label class="form-label">
                  <input
                    type="tel"
                    class="form-input-email-phoneNumber"
                    placeholder="your phone"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    readOnly
                  />
                </label>
              </div>
            </div>
            <div class="form-group-message">
              <label class="form-label-message">
                <textarea
                  class="form-input"
                  name="message"
                  placeholder="your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  readOnly
                ></textarea>
              </label>
            </div>

            <button type="button" class="form-button" readonly>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactAdminForm;
