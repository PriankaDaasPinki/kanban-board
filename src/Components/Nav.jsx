import React from "react";
import "../CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-gradient-light fixed-top">
      <div className="container-fluid navContainer">
        {/* <a className="navbar-brand" href="https://www.esquiretechnology.com/"> */}
          <img alt="esquireLoge"
            className="esquireLogo"
            src="http://www.esquiretechnology.com//storage/settings/March2024/yG8aSc4ffvkxLnKF9mLR.png"
          />
        {/* </a> */}
        <h1>KANBAN BOARD</h1>

        <div>
          <form className="d-flex">
            <div class="search-bar">
              <IoSearch className="search-icon" />
              <input
                type="text"
                name="search"
                placeholder="Search on Prianka's World"
                class="search-input"
                autocomplete="on"
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
