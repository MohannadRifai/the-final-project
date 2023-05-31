import { Link } from "react-router-dom";
import bmlogo from "../Home/images/bmlogo.jpg";
import audilogo from "../Home/images/audilogo.jpg";
import merclogo from "../Home/images/merclogo.jpeg";
import toyota from "../Home/images/toyota.jpeg";
import crypto from "../Home/images/crypto.jpg";
import book from "../Home/images/cryptobook.jpg";
import channel from "../Home/images/vip-channel.png";
import cryptocourse from "../Home/images/coursecrypto.png"


import "./Home.css";
import Testimonial from "./Testimonial";
import HeroSlider from "./Sliderhome";
import Landingpage from "./video";
import Testimonials from "./testimonialss";


function Home() {
  return (
    <div>
      <div>
        <HeroSlider />
      </div>
      <div className="home-stickyImage"></div>
    
        <div className="home-imagecollectionwithtitles">
          <div className="home-collectionwithtitles">
            <h1>Our services</h1>
            <i>Everything you need in one place!</i>
          </div>

          <div className="home-imagecollection">
   
            <div className="container-home">
              <img className="home-audi" src={cryptocourse} alt="BMW"></img>
              <div className="overlay">
                <h1>Beginner</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="/Courses">View Courses</Link>
                </button>
              </div>
            </div>

            <div className="container-home">
              <img className="home-audi" src={book} alt="BMW"></img>
              <div className="overlay">
                <h1>Intermediate</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="/Courses">View Courses</Link>
                </button>
              </div>
            </div>
        

            <div className="container-home">
              <img className="home-audi" src={channel} alt="BMW"></img>
              <div className="overlay">
                <h1>Advanced</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="/Courses">View Courses</Link>
                </button>
              </div>
            </div>

            {/* <div className="container-home">
              <img className="home-audi" src={bmlogo} alt="BMW"></img>
              <div className="overlay">
                <h1>BMW</h1>
                <br></br>
                <button className="button-overlay">
                  <Link to="/cars/BMW">View Our Collection</Link>
                </button>
              </div>
            </div> */}
          </div>
        </div>
     
      <div className="landingpage-vid">
        <Landingpage />
        
      </div>
      <div className="footer-lina-parrallax"></div>

      <div className="all-testimonials">
        <div className="testimonials">
          <div className="">
            <Testimonials /> 
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
