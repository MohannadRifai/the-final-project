import {React, useEffect, useState } from "react";

import "./homeandabout.css";
import dollar from "../../assets/dollar.png";
import aboutimg from "../AboutUs/images/about.png";
import customer from "../../assets/customer.png";
import thumb from "../../assets/thumb.png";
import Helmet from "../Helmet/Helmet";
import CommonSection from "../UI/CommonSection.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AboutUsAdmin() {
  const [about, setAbout] = useState([]);
  const [ setIsLoading] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedIndex, setEditedIndex] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const fetchAbout = async () => {
    setIsLoading(true);

    const res = await axios.get(
      "https://final-project-backend-production-20f3.up.railway.app/api/about"
    );
    setAbout(res.data.data);
    setIsLoading(false);
  };

  // Call fetchAbout on component mount
  useEffect(() => {
    if (!sessionStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    } else {
      fetchAbout();
    }
  }, [navigate]);

  // Update the edit state variables when clicking the edit button
  const handleEdit = (index) => {
    setEditedDescription(about[index].description);
    setEditedIndex(index);
  };

  // Clear the edit state variables when cancelling the edit
  const handleCancel = () => {
    setEditedDescription("");
    setEditedIndex(null);
  };

  // Update the description in the state and API when submitting the edit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update the description in the state
    const updatedAbout = [...about];
    updatedAbout[editedIndex] = {
      ...about[editedIndex],
      description: editedDescription,
    };
    setAbout(updatedAbout);

    // Update the description in the API
    const res = await axios.put(
      `https://final-project-backend-production-20f3.up.railway.app/api/about/${about[editedIndex]._id}`,
      {
        description: editedDescription,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res.data);

    // Clear the edit state variables
    setEditedDescription("");
    setEditedIndex(null);
  };

  return (
    <div>
      <Helmet title="About Us">
        <CommonSection title="About Us" />

        <div className="about-everything">
          <h5 className="about-welcome"> Welcome to RoadCar</h5>
          <div className="about-titDescImg">
            <div className="about-titDesc">
              <h1 className="about-title">About Us</h1>
              <br />
              <br />
              <div>
                {about.map((item, index) => (
                  <div className="about-section" key={index}>
                    {editedIndex === index ? (
                      // Render the edit form when editing this section
                      <form onSubmit={handleSubmit}>
                        <textarea
                          className="about-textarea"
                          value={editedDescription}
                          onChange={(event) =>
                            setEditedDescription(event.target.value)
                          }
                        />
                        <di>
                          <button className="admin-testi-buttons" type="submit">
                            Save
                          </button>
                          <button
                            className="canclebtn-home admin-testi-buttons"
                            type="button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </di>
                      </form>
                    ) : (
                      // Render the description text when not editing this section
                      <div>
                        <p className="about-description">{item.description}</p>
                        <button
                          className="admin-testi-buttons"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="about-description">
              <img className="aboutimage" src={aboutimg} alt="aboutimage"></img>
            </div>
          </div>
        </div>

        <div className="about-imageFooter">
          <div className="about-allimgs">
            <h1 className="about-reasonTitle">Reasons to buy from RoadCar</h1>
            <div className="aboutsection">
              <div className="aboutthird-img">
                <img className="about-thumb" src={thumb} alt="thumb"></img>
                <h3>Quality service</h3>
                <p>
                  We ensure that every vehicle we sell is thoroughly inspected,
                  maintained, and ready to hit the road.
                </p>
              </div>
              <div className="aboutthird-img">
                <img className="about-thumb" src={dollar} alt="thumb"></img>
                <h3>Competitive pricing</h3>
                <p>
                  We provide competitive prices to make sure you get the best
                  value for your money.
                </p>
              </div>
              <div className="aboutthird-img">
                <img className="about-thumb" src={customer} alt="thumb"></img>
                <h3>Customer Service</h3>
                <p>
                  We provide exceptional customer service that meets the unique
                  needs of each and every customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Helmet>
    </div>
  );
}

export default AboutUsAdmin;
