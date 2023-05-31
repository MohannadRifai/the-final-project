import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./AdminUsers.css";

const AdminNewCar = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [mileage, setMileage] = useState("");
  const [features, setFeatures] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const token = sessionStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      formData.append("image", image);

      const response = await axios.post(
        "https://final-project-backend-production-20f3.up.railway.app/api/cars",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // handle success
      console.log(response.data);

      // reset form fields
      setName("");
      setImage("");
      setCategory("");
      setMileage("");
      setFeatures("");
      setPrice("");
      setYear("");
      setStock("");
      setDescription("");
      // show success toast message
      toast.success("Car created successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const uploadImageHandler = async (e) => {
    try {
      // Make sure we have a valid event object
      if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
        throw new Error("Invalid input file");
      }

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qbrl2d0d");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxe8xonxx/image/upload",
        formData
      );

      setImage(response.data.url);
    } catch (error) {
      console.error(error);
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

      <Link
        className="go-back btn btn-dark my-3"
        to="/Admin/cars"
        style={{ width: "150px", whiteSpace: "nowrap", float: "left" }}
      >
        Go Back
      </Link>

      <form onSubmit={submitHandler}>
        <div class="form-group">
          <ToastContainer />
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="image" class="left-label">
            Image:
          </label>
          <div class="custom-file">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => uploadImageHandler(e)}
              class="custom-file-input"
              required
            />
            <label class="custom-file-label" for="image">
              Choose file
            </label>
          </div>
          {image && (
            <div>
              <img
                src={image}
                alt="name"
                class="uploaded-image"
                style={{ width: "300px", height: "200px" }}
              />
            </div>
          )}
        </div>

        <div class="form-group">
          <label for="mileage" class="left-label">
            Mileage:
          </label>
          <input
            type="text"
            id="mileage"
            name="mileage"
            placeholder="Enter mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="features" class="left-label">
            Features:
          </label>
          <input
            type="text"
            id="features"
            placeholder="Enter features"
            name="features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="price" class="left-label">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="year" class="left-label">
            Year:
          </label>
          <input
            type="number"
            id="year"
            name="year"
            min="1950"
            max="2099"
            step="1"
            placeholder="Enter year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label for="category" class="left-label">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            class="form-control"
            required
          >
            <option value="">Select a category</option>
            <option value="BMW">Courses</option>
            <option value="MERCEDES">MERCEDES</option>
            <option value="GMC">GMC</option>
            <option value="FORD">FORD</option>
            <option value="AUDI">AUDI</option>
            <option value="TOYOTA">TOYOTA</option>
            <option value="ELECTRIC CAR">ELECTRIC CAR</option>
          </select>
        </div>

        <div class="form-group">
          <label for="stock" class="left-label">
            Stock:
          </label>
          <select
            id="stock"
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            class="form-control"
            required
          >
            <option value="">Select a category</option>
            <option value="IN STOCK">IN STOCK</option>
            <option value="OUT OF STOCK">OUT OF STOCK</option>
          </select>
        </div>

        <div class="form-group">
          <label for="description" class="left-label">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            class="form-control"
            required
          ></textarea>
          <button
            type="submit"
            className=" create-btn btn btn-primary"
            style={{
              width: "150px",
              whiteSpace: "nowrap",
              float: "left",
              backgroundColor: "red",
              fontWeight: "bold",
            }}
          >
            Create Car
          </button>
        </div>

        <br />
      </form>
    </>
  );
};

export default AdminNewCar;
