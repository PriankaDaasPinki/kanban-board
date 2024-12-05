import React from "react";
import "../CSS/nav.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { IoSearch } from "react-icons/io5";
import { Container, Navbar } from "react-bootstrap";
import { CiLight } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";

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

        <div class="d-flex p-0">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-cintent-end">
            <li className="nav-item">
              <a
                class="text-dark"
                href="#!"
                onclick="javascript:toggleFullScreen()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-maximize"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </a>
            </li>
            <li className="nav-item">
              <div class="mode">
                <CiLight className="nav-icon" />
              </div>
            </li>
            <li className="nav-item onhover-dropdown">
              <a href="/notifications/" class="text-dark">
                <div class="notification-box">
                  <IoIosNotificationsOutline className="nav-icon" />
                </div>
                {/* <div class="onhover-show-div notification-dropdown">
                  <h6 class="f-18 mb-0 dropdown-title">Notitications</h6>
                  <ul class="live_notify_list">
                    <li>
                      <a class="f-w-700" href="/notifications">
                        View all Notification
                      </a>
                    </li>
                  </ul>
                </div> */}
              </a>
            </li>

            <li className="nav-item">
              <div class="d-flex align-items-center">
                <FaUserAlt className="nav-icon" />
                {/* <img
                  class="b-r-10"
                  src="/static/assets/images/dashboard/profile.png"
                  alt="INTERN001"
                  height="40"
                /> */}
                <div class="ps-4">
                  <span>Priyanka</span>
                  <p class="mb-0 font-roboto">Software Engineer</p>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a href="/profile/" class="text-dark h5">
                <IoSettingsOutline className="rotating nav-icon" />
              </a>
            </li>
            <li className="nav-item">
              <a href="/logout/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        {/* <Form>
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
        </Form> */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
