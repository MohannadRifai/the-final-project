import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import { useState } from "react";
import { Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  RemixIcon,
  riCarLine,
  riSettings2Line,
  riTimerFlashLine,
} from "@mwarnerdotme/react-remixicon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "../styles/car-item.css"; // <-- Import the CSS file

const CarItem = ({ products, selectedCategory }) => {
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const [modalIsOpen, setModalIsOpen] = useState(false); // <-- Add state for modal

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
    const phoneNumber = sessionStorage.getItem("phoneNumber");

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
          phoneNumber: phoneNumber,
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
      <ToastContainer className="toast-container" />

      <h1
        className="section__title mb-5"
        style={{ borderBottom: "solid 5px red" }}
      >
        {" "}
      </h1>

      {filteredProducts.map((product) => (
        <Col lg="4" md="4" sm="6" key={product._id} className="mb-5">
          <div className="cars__screen">
            <div className="car__item">
              <div className="car__img">
                <Image
                  cloudName="dxe8xonxx"
                  publicId={product.public_id}
                  secure="true"
                />
              </div>

              <div className="car__item-content mt-4">
                <h6
                  className="section__title text-center"
                  style={{ color: "#dc3545", whiteSpace: "nowrap" }}
                >
                  {product.name}
                </h6>
                <h5
                  className="rent__price text-center mt-"
                  style={{ color: "#dc3545" }}
                >
                  {product.price}
                </h5>
                <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
                  <span className="d-flex align-items-center gap-1">
                    <RemixIcon icon={riCarLine} size="1x" color="#dc3545" />{" "}
                    {product.category}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <RemixIcon
                      icon={riSettings2Line}
                      size="1x"
                      color="#dc3545"
                    />
                    {product.features}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <RemixIcon
                      icon={riTimerFlashLine}
                      size="1x"
                      color="#dc3545"
                    />
                    {product.mileage}
                  </span>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    className=" seedetails w-50 car__item-btn car__btn-details"
                    style={{ borderRadius: "40px" }}
                  >
                    <Link to={`/product/${product.name}`}>See Details</Link>
                  </button>
                  <button
                    className=" reserve-btn w-50 car__item-btn car__btn-rent"
                    style={{ borderRadius: "40px", marginLeft: "10px" }}
                    onClick={() => {
                      toggleModal();
                    }} // <-- Open modal on button click
                  >
                    <strong>Reserve </strong>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Popup Modal */}
          <Modal isOpen={modalIsOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Confirm Reservation</ModalHeader>
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
      ))}
    </>
  );
};

export default CarItem;
