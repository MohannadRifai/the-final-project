import React, { Fragment } from "react";

import Footer from "../Components/Footer/Footer.jsx";
import AdminRouter from "../routers/AdminRouter.jsx";
import AdminHeader from "../Components/Header/AdminHeader.jsx";

const UserLayout = () => {
  return (
    <Fragment>
      <AdminHeader />
      <div>
        <AdminRouter />
      </div>
      <Footer />
    </Fragment>
  );
}; 

export default UserLayout;
