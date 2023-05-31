import React from "react";
// import "./landingpage.css";
import Pay from "../Home/images/Pay.png";
import drive from "../Home/images/drive.png";
import choose from "../Home/images/choose.png";
import "./video.css";
import BgVideo from "../Home/images/video.mp4";
import payment from "../Home/images/paymentcrypto.png";
import trading from "../Home/images/trading.png";
import course from "../Home/images/course.png";
import btc from "../Home/images/Bitcoin.png";


const Landingpage = () => {
  return (
    <div className="landingpage">
      {/* <video src={BgVideo} autoPlay muted loop class="video-bg" /> */}
      <img src={btc} alt="" class="video-bg"></img>

      <div className="bg-overlay"></div>

      <div className="home-text">
        <div className="home-imageFooter">
          <h1>Crypto Club</h1>
          <h2 className="home-resons"></h2>
          <div className="home-allimgs">
            <div className="homesecondsection">
              <div className="homethird-img">
                <img className="home-payicon" src={course} alt=""></img>
                <h2 style={{ color: "#ff890b" }}>Choose Your Course</h2>
                <h4>
                  Browse our comprehensive selection of trading courses and
                  choose the one that suits your needs.
                </h4>
              </div>
              <div className="homethird-img">
                <img className="home-payicon" src={payment} alt=""></img>
                
                <h2 style={{ color: "#ff890b" }}>Pay Using Cryptocurrency</h2>
                <h4>
                  Pay easily with Cryptocurrency and receive your course as soon
                  as possible.
                </h4>
              </div>
              <div className="homethird-img">
                <img className="home-payicon" src={trading} alt=""></img>
                <h2 style={{ color: "#ff890b" }}>Start Trading!</h2>
                <h4>
                  Put your learning into practice and start trading with
                  confidence using our advanced trading platform.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
