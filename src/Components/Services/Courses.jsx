import React, { useState, useEffect } from "react";
import "./courses.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";

import beginners from "./beginner-level.png";
import intermediate from "./intermediate-level.png";
import advanced from "./advanced-level.png";

const Courses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status

  // Check authentication status on page load
  useEffect(() => {
    // Check if user is logged in (replace with your authentication logic)
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Store enrolled courses in sessionStorage
    sessionStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const handleEnroll = (course) => {
    setSelectedCourse(course);
    if (isLoggedIn) {
      setEnrolledCourses([...enrolledCourses, course]);
      // Redirect the user to the desired link based on the enrolled course
      switch (course) {
        case "Beginner Level":
          window.open("https://cointelegraph.com/learn/how-to-trade-cryptocurrencies-the-ultimate-beginners-guide", "_blank");

          break;
        case "Intermediate Level":
          window.open("https://www.cmcmarkets.com/en/trading-guides/advanced-technical-analysis", "_blank");
          break;
        case "Advanced Level":
          window.open("https://blog.liquid.com/make-your-next-crypto-trade-a-killer-move-free-strategies-from-pro-traders", "_blank");
          break;
        default:
          break;
      }
    } else {
      alert("You must be logged in to enroll.");
    }
  };

  const isCourseEnrolled = (course) => {
    return enrolledCourses.includes(course);
  };

  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="4" lg="3" xl="2">
          {/* First Card */}
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <img src={beginners} alt="" />
              <a href="#!">
                <div className="mask"></div>
              </a>
            </MDBRipple>
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <a href="#!" className="text-dark">
                      Beginner
                    </a>
                  </p>
                  <p className="small text-muted">
                    Cryptocurrency Trading Fundamentals
                  </p>
                </div>
                <div>
                  <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger"></div>
                  <p className="small text-muted">Rated 4.3/5</p>
                </div>
              </div>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <p>
                  <a href="#!" className="text-dark">
                    Free
                  </a>
                </p>
                <p className="text-dark">#### 8787</p>
              </div>
              <p className="small text-muted">No Payment Required</p>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                {isLoggedIn ? (
                  <>
                    <p className="text-dark fw-bold">Enroll Now</p>
                    <button
                      className={`btn btn-primary ${
                        isCourseEnrolled("Beginner Level") ? "disabled" : ""
                      }`}
                      onClick={() => handleEnroll("Beginner Level")}
                      disabled={isCourseEnrolled("Beginner Level")}
                    >
                      {isCourseEnrolled("Beginner Level")
                        ? "Enrolled"
                        : "Enroll"}
                    </button>
                  </>
                ) : (
                  <p className="text-dark fw-bold">Please log in to enroll.</p>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" lg="3" xl="2">
          {/* Second Card */}
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <img src={intermediate} alt="" />
              <a href="#!">
                <div className="mask"></div>
              </a>
            </MDBRipple>
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <a href="#!" className="text-dark">
                      Intermediate
                    </a>
                  </p>
                  <p className="small text-muted">
                    Technical Analysis Strategies
                  </p>
                </div>
                <div>
                  <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger"></div>
                  <p className="small text-muted">Rated 4.3/5</p>
                </div>
              </div>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <p>
                  <a href="#!" className="text-dark">
                    Free
                  </a>
                </p>
                <p className="text-dark">#### 8788</p>
              </div>
              <p className="small text-muted">No Payment Required</p>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                {isLoggedIn ? (
                  <>
                    <p className="text-dark fw-bold">Enroll Now</p>
                    <button
                      className={`btn btn-primary ${
                        isCourseEnrolled("Intermediate Level") ? "disabled" : ""
                      }`}
                      onClick={() => handleEnroll("Intermediate Level")}
                      disabled={isCourseEnrolled("Intermediate Level")}
                    >
                      {isCourseEnrolled("Intermediate Level")
                        ? "Enrolled"
                        : "Enroll"}
                    </button>
                  </>
                ) : (
                  <p className="text-dark fw-bold">Please log in to enroll.</p>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" lg="3" xl="2">
          {/* Third Card */}
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image rounded hover-overlay"
            >
              <img src={advanced} alt="" />
              <a href="#!">
                <div className="mask"></div>
              </a>
            </MDBRipple>
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <p>
                    <a href="#!" className="text-dark">
                      Advanced
                    </a>
                  </p>
                  <p className="small text-muted">
                    Algorithmic Trading in Cryptocurrency
                  </p>
                </div>
                <div>
                  <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger"></div>
                  <p className="small text-muted">Rated 4.3/5</p>
                </div>
              </div>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between">
                <p>
                  <a href="#!" className="text-dark">
                    Free
                  </a>
                </p>
                <p className="text-dark">#### 8789</p>
              </div>
              <p className="small text-muted">No Payment Required</p>
            </MDBCardBody>
            <hr className="my-0" />
            <MDBCardBody className="pb-0">
              <div className="d-flex justify-content-between align-items-center pb-2 mb-4">
                {isLoggedIn ? (
                  <>
                    <p className="text-dark fw-bold">Enroll Now</p>
                    <button
                      className={`btn btn-primary ${
                        isCourseEnrolled("Advanced Level") ? "disabled" : ""
                      }`}
                      onClick={() => handleEnroll("Advanced Level")}
                      disabled={isCourseEnrolled("Advanced Level")}
                    >
                      {isCourseEnrolled("Advanced Level")
                        ? "Enrolled"
                        : "Enroll"}
                    </button>
                  </>
                ) : (
                  <p className="text-dark fw-bold">Please log in to enroll.</p>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Courses;
