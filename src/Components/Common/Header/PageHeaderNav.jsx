import React from "react";
import { Container } from "react-bootstrap";
import { IoChevronBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

const PageHeaderNav = () => {
  return (
    <Container fluid className="ps-4 pe-4 pageHeaderContainer">
      <div className="pageHeaderMenu">Project List</div>
      <Link className="d-flex align-items-center p-3" to={"/"}>
        <IoChevronBackCircle className="nav-icon" />
        {/* <p className="navText">Dashboard</p> */}
      </Link>
    </Container>
  );
};

export default PageHeaderNav;
