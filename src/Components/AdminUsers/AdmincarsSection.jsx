import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.css";
import "./AdminUsers.css";

import axios from "axios";

const AdminCarsScreen = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    setIsLoading(true);

    const fetchCars = async () => {
      const { data } = await axios.get(
        "https://final-project-backend-production-20f3.up.railway.app/api/cars"
      );
      setCars(data);
      setIsLoading(false);
    };

    fetchCars();
  }, []);

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: '<i class="fas fa-trash-alt"></i> Yes, delete it!',
      confirmButtonIcon: false,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://final-project-backend-production-20f3.up.railway.app/api/cars/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCars(cars.filter((car) => car._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your Car has been deleted.",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateHandler = async (id, updatedCar) => {
    const formData = new FormData();
    formData.append("name", updatedCar.name);
    formData.append("mileage", updatedCar.mileage);
    formData.append("features", updatedCar.features);
    formData.append("price", updatedCar.price);
    formData.append("year", updatedCar.year);
    formData.append("stock", updatedCar.stock);
    formData.append("description", updatedCar.description);
    formData.append("category", updatedCar.category);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    const { data } = await axios.put(
      `https://final-project-backend-production-20f3.up.railway.app/api/cars/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCars(cars.map((car) => (car._id === id ? { ...data } : { ...car })));
    setEditingCar(null);
    setSelectedFile(null);
    toast.success("Car updated successfully!");
  };

  const handleEdit = (car) => {
    setEditingCar(car);
  };

  const handleCancel = () => {
    setEditingCar(null);
    setSelectedFile(null);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      setSelectedFile(event.target.files[0]);
    } else {
      setEditingCar((prevEditingCar) => ({
        ...prevEditingCar,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <ToastContainer />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          className=" btn-cretecar btn btn-dark my-3"
          to="/Admin/newcar"
          style={{
            width: "170px",
            fontSize: "20px",
            whiteSpace: "nowrap",
            backgroundColor: "rgb(178, 55, 20)",
            color: "#fff",
          }}
        >
          Create New Car
        </Link>
      </div>

      <Table striped bordered hover responsive className="table-responsive-sm">
        <thead>
          <h1>Cars List</h1>

          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Mileage</th>
            <th>Price</th>
            <th>Year</th>
            <th>Stock</th>
            <th>Features</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "1px solid black" }}>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <div>
                    <input type="file" onChange={handleInputChange} />
                    {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                    {!selectedFile && (
                      <img src={car.url} alt={car.image} width="100" />
                    )}
                  </div>
                ) : (
                  <img src={car.url} alt={car.image} width="100" />
                )}
              </td>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={editingCar.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  car.name
                )}
              </td>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter mileage"
                    name="mileage"
                    value={editingCar.mileage}
                    onChange={handleInputChange}
                    style={{ width: "120px" }} // Set the width of the input field
                  />
                ) : (
                  car.mileage
                )}
              </td>

              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    value={editingCar.price}
                    onChange={handleInputChange}
                    style={{ width: "120px" }} // Set the width of the input field
                  />
                ) : (
                  car.price
                )}
              </td>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter year"
                    name="year"
                    value={editingCar.year}
                    onChange={handleInputChange}
                    style={{ width: "120px" }} // Set the width of the input field
                  />
                ) : (
                  car.year
                )}
              </td>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    as="select"
                    value={editingCar.stock}
                    name="stock"
                    onChange={handleInputChange}
                    style={{ width: "130px" }} // Set the width of the input field
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="IN STOCK">IN STOCK</option>
                    <option value="OUT OF STOCK">OUT OF STOCK</option>
                  </Form.Control>
                ) : (
                  car.stock
                )}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter features"
                    name="features"
                    value={editingCar.features}
                    onChange={handleInputChange}
                  />
                ) : (
                  car.features
                )}
              </td>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    value={editingCar.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  car.description
                )}
              </td>
              <td>
                {editingCar && editingCar._id === car._id ? (
                  <Form.Control
                    as="select"
                    value={editingCar.category}
                    name="category"
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="BMW">Courses</option>
                    <option value="MERCEDES">MERCEDES</option>
                    <option value="TOYOTA">TOYOTA</option>
                    <option value="ELECTRIC CAR">ELECTRIC CAR</option>
                    <option value="GMC">GMC</option>
                    <option value="FORD">FORD</option>
                    <option value="AUDI">AUDI</option>
                  </Form.Control>
                ) : (
                  car.category
                )}
              </td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {editingCar && editingCar._id === car._id ? (
                  <>
                    <Button
                      variant="success"
                      className="delete-btn-cars btn-sm mr-2"
                      onClick={() => updateHandler(car._id, editingCar)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="light"
                      className="edit-btn-cars btn-sm"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      className="edit-btn-cars btn-sm mr-2"
                      onClick={() => handleEdit(car)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="delete-btn-cars btn-sm"
                      onClick={() => deleteHandler(car._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminCarsScreen;
