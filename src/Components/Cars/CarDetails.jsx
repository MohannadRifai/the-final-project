import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import emailjs from "@emailjs/browser";

import "react-toastify/dist/ReactToastify.css";
const CarDetails = () => {
  const { name } = useParams();
  const [product, setProduct] = useState({});
  const [activeKey, setActiveKey] = useState("description");
  const [modalIsOpen, setModalIsOpen] = useState(false); // <-- Add state for modal
  const [setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Fetch the product by name to get its _id field
        const resNames = await fetch(
          `https://final-project-backend-production-20f3.up.railway.app/api/cars`
        );
        const dataNames = await resNames.json();
        const car = dataNames.find((c) => c.name === name);

        if (!car) {
          throw new Error(`Car with name '${name}' not found`);
        }

        // Use the _id field to fetch the full product details
        const resId = await fetch(
          `https://final-project-backend-production-20f3.up.railway.app/api/cars/${car._id}`
        );
        const data = await resId.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [name]);

  const handleTabClick = (key) => {
    setActiveKey(key);
  };

  const toggleModal = () => {
    // Check if user is logged in
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login/register before reserving a car.");
      return;
    }

    // User is logged in, proceed with opening the modal
    setModalIsOpen(!modalIsOpen);
  };
  const reserveCar = (carId) => {
    const token = sessionStorage.getItem("token");
    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");
    const email = sessionStorage.getItem("email");
    if (!token) {
      toast.error("Please login/register before reserving a car.");
      return;
    }

    axios
      .post(
        "https://final-project-backend-production-20f3.up.railway.app/api/Reservations/",
        { carId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.reservation.car.price);
        const carname = response.data.reservation.car.name;
        const carcategory = response.data.reservation.car.category;
        const carprice = response.data.reservation.car.price;
        const caryear = response.data.reservation.car.year;
        const currentDate = new Date().toLocaleString();

        const params = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          carname: carname,
          carcategory: carcategory,
          caryear: caryear,
          carprice: carprice,
          date: currentDate,
        };

        emailjs
          .send(
            "service_i65z4yo",
            "template_kz0prl9",
            params,
            "X3GWKBc5fNzTxb_rm"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );

        toggleModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="mt-5 mb-5">
        <Link
          className="listing-btn btn btn-dark my-3"
          to="/Cars"
          style={{ width: "150px", whiteSpace: "nowrap", float: "left" }}
        >
          Car Listings{" "}
        </Link>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <ToastContainer className="toast-container" />

        <Row style={{ marginTop: "100px" }}>
          <Col md={7}>
            {product.url && (
              // <-- only render Image if product.url exists
              <div>
                <Image
                  src={product.url}
                  alt={product.name}
                  fluid
                  style={{ marginBottom: "20px" }}
                />
              </div>
            )}

            <Tab.Container id="left-tabs-example" activeKey={activeKey}>
              <Nav
                variant="tabs"
                style={{
                  backgroundColor: "#ddd",
                  flexWrap: "nowrap",
                  width: "39%",
                }}
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="description"
                    onClick={() => handleTabClick("description")}
                    style={{
                      backgroundColor:
                        activeKey === "features" ? "#808080" : "#222222",
                      color: "#ffffff",
                      borderBottom:
                        activeKey === "description" ? "3px solid #8B0000" : "",
                      padding: "15px 25px 10px 25px",
                      fontWeight: 600,
                      fontSize: 14,
                      width: 200,
                      display: "inline-block", // Add this line to make the link inline
                    }}
                  >
                    Description
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="features"
                    onClick={() => handleTabClick("features")}
                    style={{
                      backgroundColor:
                        activeKey === "description" ? "#808080" : "#222222",
                      color: "#ffffff",
                      borderBottom:
                        activeKey === "features" ? "3px solid #8B0000" : "",
                      padding: "15px 25px 10px 25px",
                      fontWeight: 600,
                      fontSize: 14,
                      width: 200,
                      display: "inline-block", // Add this line to make the link inline
                    }}
                  >
                    Features
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <br />
              <Tab.Content>
                <Tab.Pane eventKey="description" style={{ textAlign: "left" }}>
                  <p style={{ fontFamily: "Poppins" }}>{product.description}</p>
                </Tab.Pane>
                <Tab.Pane eventKey="features" style={{ textAlign: "left" }}>
                  <ul>
                    <li>Features: {product.features}</li>
                  </ul>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
          <Col md={4} className="mt-4 mt-md-0">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Name: {product.name}</ListGroup.Item>
              <ListGroup.Item>Category: {product.category}</ListGroup.Item>
              <ListGroup.Item>Stock: {product.stock}</ListGroup.Item>
              <ListGroup.Item>Year: {product.year}</ListGroup.Item>
              <ListGroup.Item>Mileage: {product.mileage}</ListGroup.Item>
              <ListGroup.Item>Price: {product.price}</ListGroup.Item>
            </ListGroup>

            <div className="text-center">
              <button
                className=" reserve-btn w-50 car__item-btn car__btn-rent"
                style={{
                  borderRadius: "40px",
                  marginLeft: "10px",
                  marginTop: "50px",
                  color: "white",
                }}
                onClick={toggleModal}
              >
                Reserve
              </button>
            </div>

            {/* Popup Modal */}
            <Modal isOpen={modalIsOpen} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>
                Confirm Reservation
              </ModalHeader>
              <ModalBody>Are you sure you want to reserve this car?</ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    reserveCar(product._id);
                  }}
                >
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={toggleModal}>
                  No
                </button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CarDetails;
