import React from "react";
import "../CSS/nav.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { IoSearch } from "react-icons/io5";
import { Container, Form, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar fixed="top" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="https://www.esquiretechnology.com/">
          <img
            src="http://www.esquiretechnology.com//storage/settings/March2024/yG8aSc4ffvkxLnKF9mLR.png"
            alt="esquireLogo"
            className="esquireLogo"
          />
        </Navbar.Brand>
        <h1>KANBAN BOARD</h1>
        <Form>
          <div className="search-bar">
            <IoSearch className="search-icon" />
            <input
              type="text"
              name="search"
              placeholder="Search Tasks Here"
              className="search-input"
              autocomplete="on"
            />
          </div>
        </Form>
      </Container>
    </Navbar>
    // <nav className="navbar navbar-expand-lg navbar-light bg-gradient-light fixed-top">
    //   <div className="container-fluid navContainer">
    //     <a className="navbar-brand" href="https://www.esquiretechnology.com/">
    //       <img
    //         alt="esquireLoge"
    //         className="esquireLogo col-md-2"
    //         src="http://www.esquiretechnology.com//storage/settings/March2024/yG8aSc4ffvkxLnKF9mLR.png"
    //       />
    //     </a>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="true"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>

    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <h1>KANBAN BOARD</h1>
    //       <form className="d-flex">
    //         <div className="search-bar">
    //           <IoSearch className="search-icon" />
    //           <input
    //             type="text"
    //             name="search"
    //             placeholder="Search Tasks Here"
    //             className="search-input"
    //             autocomplete="on"
    //           />
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default NavBar;
