
import Helmet from "../Helmet/Helmet";
import CommonSection from "../UI/CommonSection.jsx";
import "./AboutUs.css";
import { useEffect, useState } from "react";
import axios from "axios";
import aboutUs from "../AboutUs/images/aboutUs.png";

function AboutUs() {
  const [ setLoading] = useState(true);
  const [about, setAbout] = useState([]);

  const fetchAbout = async () => {
    setLoading(true);

    const res = await axios.get(
      "https://final-project-backend-production-20f3.up.railway.app/api/about"
    );
    setAbout(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <Helmet title="About Us">
      <CommonSection title="About Us" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />

      <div className="about-everything">
        <h5 className="about-welcome"> Who Are We</h5>
        <div className="about-titDescImg">
          <div className="about-description">
            {about.map((item, index) => (
              <div className="about-section" key={index}>
                <p className="about-cldescription"> {item.description}</p>
              </div>
            ))}
          </div>

          <div className="about-description">
            <img className="aboutUsImage" src={aboutUs} alt="aboutimage"></img>
          </div>
        </div>

        {/* <div className="about-imageFooter">
          <div className="about-allimgs">
            <h1 className="about-reasonTitle">Reasons to buy from RoadCar</h1>
            <div className="aboutsection">
              <div className="aboutthird-img">
                <img className="about-thumb" src={thumb} alt=""></img>
                <h3>Quality service</h3>
                <p>
                  We ensure that every vehicle we sell is thoroughly inspected,
                  maintained, and ready to hit the road.
                </p>
              </div>
              <div className="aboutthird-img">
                <img className="about-thumb" src={dollar} alt=""></img>
                <h3>Competitive pricing</h3>
                <p>
                  We provide competitive prices to make sure you get the best
                  value for your money.
                </p>
              </div>
              <div className="aboutthird-img">
                <img className="about-thumb" src={customer} alt=""></img>
                <h3>Customer Service</h3>
                <p>
                  We provide exceptional customer service that meets the unique
                  needs of each and every customer.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </Helmet>
  );
}

export default AboutUs;
