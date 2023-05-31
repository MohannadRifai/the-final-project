import "../App.css";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AboutUsAdmin from "../Components/AdminUsers/AboutUs-admin";
import AdminCarsScreen from "../Components/AdminUsers/AdmincarsSection";
import AdminNewCar from "../Components/AdminUsers/AdminnewCar";
import ContactUsAdmin from "../Components/AdminUsers/contactUs-admin";
import ClientMessages from "../Components/AdminUsers/client-messages";
import AdminHome from "../Components/AdminUsers/Admin-home";
import ScrollToTop from "../Components/Home/ScrolltoTop/Scroll";
import Page404 from "../Components/Home/404 Page/Page404";
import ReservationsAdmin from "../Components/AdminUsers/Reservations/ReservationsAdmin";
import UserTable from "../Components/AdminUsers/Users";

const Routers = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/*" element={<Page404/>} />
        <Route path="/Admin/Home" element={<AdminHome />} />
        <Route path="/Admin/cars" element={<AdminCarsScreen />} />
        <Route path="/Admin/newcar" element={ <Container> <AdminNewCar /></Container> }/>
        <Route path="/Admin/AboutUs" element={<AboutUsAdmin />} />
        <Route path="/ContactUsAdmin" element={<ContactUsAdmin />} />
        <Route path="/clientmessages" element={<Container> <ClientMessages /></Container>} />
        <Route path="/reservations" element={<Container> <ReservationsAdmin /></Container>}/>
        <Route path="/users" element={<Container> <UserTable /></Container>}/>

      </Routes>
      <ScrollToTop />
    </div>
  );
};

export default Routers;


