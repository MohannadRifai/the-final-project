import React, { useState, useEffect } from "react";
import axios from "axios";
import "./client-messages.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [ setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  // Define fetchData function outside of useEffect block
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://final-project-backend-production-20f3.up.railway.app/api/user/getAll",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token") && window.location.pathname !== "/") {
      navigate("/");
    }

    fetchData(); // call fetchData here
  }, [navigate]);

  const [ setSelectedContact] = useState(null);

  const handleDelete = (id) => {
    setSelectedContact(id); // set the selected contact id
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
            `https://final-project-backend-production-20f3.up.railway.app/api/user/delete/${id}`,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            fetchData(); // call fetchData here
            toast.success("Reservation deleted successfully!"); // <-- show success message

            if (response.data.success) {
              setUsers(users.filter((item) => item._id !== id)); // update the state
              setSelectedContact(null); // reset the selected contact id
            } else {
              console.log("Failed to delete contact.");
              setSelectedContact(null); // reset the selected contact id
            }
          })
          .catch((error) => {
            console.log(error);
            setSelectedContact(null); // reset the selected contact id
          });
      } else {
        setSelectedContact(null); // reset the selected contact id
      }
    });
  };
  return (
    <div>
      <ToastContainer />

      <div className="reservation-lina-table-container">
        <h1 className="reservation-lina-title"> All users </h1>

        <div>
          <div className="header-reservation">
            <div>First name</div>
            <div>Last name</div>
            <div>Email</div>
            <div>Number</div>
            <div className="action">Actions</div>
          </div>

          <div className="all-mssgs">
            {users.map((user) => (
              <div key={user._id} className="contact-reservation">
                <div className="contact-name">{user.firstName}</div>
                <div>{user.lastName}</div>
                <div>{user.email}</div>
                <div>{user.phoneNumber}</div>
                <div>
                  <button
                    className="delete-client-btn btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserTable;
