import React, { Fragment } from "react";

import Header from "../Components/Header/Header";
import Footer from '../Components/Footer/Footer.jsx';
import Routers from "../routers/Routers.jsx";

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Layout;
