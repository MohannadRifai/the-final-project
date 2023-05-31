import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./ReservationsAdmin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage ] = useState(10);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "https://final-project-backend-production-20f3.up.railway.app/api/Reservations",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(response.data.reservations);
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = reservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(reservations.length / reservationsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleDelete = (reservationId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this contact.",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://final-project-backend-production-20f3.up.railway.app/api/Reservations/${reservationId}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            fetchReservations();
            setReservations(
              reservations.filter((r) => r._id !== reservationId)
            );
            toast.success("Reservation deleted successfully!"); // <-- show success message
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="reservation-lina-table-container">
      <ToastContainer />
      <h1 className="reservation-lina-title"> Current Reservations: </h1>
      <div>
        <div className="header-reservation">
          <div>Car Name</div>
          <div>Price</div>
          <div>Email</div>
          <div>Phone Number</div>
          <div className="action">Actions</div>
        </div>
        <div className="all-mssgs">
          {currentReservations.map((reservation) => (
            <div key={reservation._id} className="contact-reservation">
              <div>{reservation.carId.name}</div>
              <div>{reservation.carId.price}</div>
              <div>{reservation.userId.email}</div>
              <div>{reservation.userId.phoneNumber}</div>{" "}
              {/* moved phone number to own th */}
              <div>
                <button
                  className="delete-client-btn btn btn-danger"
                  onClick={() => {
                    handleDelete(reservation._id); // <-- use new function to handle delete and confirm
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <ul className="pagination-list">
          {pageNumbers.map((number) => (
            <li key={number} id={number} onClick={handleClick}>
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationTable;
