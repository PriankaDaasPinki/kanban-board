import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { IoIosArrowBack } from "react-icons/io";

const PageHeaderNav = ({ pageTitle, subTitle, breadcrumbItems }) => {
  const navigate = useNavigate();
  // console.log("pageTitle " + pageTitle);
  return (
    <Container fluid className="pageHeaderContainer pb-2">
      <div className="pageHeaderMenu ps-2 pb-2">
        {pageTitle ? pageTitle + " | " + subTitle : "Project List"}
      </div>

      <div className="d-flex align-items-center pb-2">
        <Breadcrumb items={breadcrumbItems} />
        <div
          className="d-flex align-items-center ms-5 me-1 ps-1 pe-1 border border-secondary rounded"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowBack className="nav-icon" />
          {/* <p className="navText">Dashboard</p> */}
        </div>
      </div>
    </Container>
  );
};

export default PageHeaderNav;
