import React from "react";
import "../../../CSS/nav.css";
import { Container, Navbar } from "react-bootstrap";
import { IoIosNotifications } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiFullscreen } from "react-icons/bi";
import { RxExit } from "react-icons/rx";
// import { NavLink } from "react-router-dom";
// import { MdLightMode } from "react-icons/md";
// import { FullScreen, useFullScreenHandle } from "react-full-screen";

const NavBar = () => {
  // const [showDropdown, setShowDropdown] = useState(false);
  // const handle = useFullScreenHandle();
  const handleFullScreen = () => {
    const element = document.documentElement; // The whole document
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // For Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // For Chrome, Safari, and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // For Internet Explorer
      element.msRequestFullscreen();
    }
  };

  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

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
        {/* <FullScreen handle={handle}> */}
        {/* <h1>KANBAN BOARD</h1> */}

        <div className="d-flex p-0">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center justify-cintent-end">
            <li className="nav-item">
              <div onClick={handleFullScreen}>
                <BiFullscreen className="small-icon" />
              </div>
            </li>
            {/* <li className="nav-item">
              <div className="mode">
                <MdLightMode className="small-icon" />
              </div>
            </li> */}

            <li className="nav-item dropdown">
              <a href="/notifications/" className="text-dark onhover-dropdown">
                <div className="nav-link dropdown-toggle" role="button">
                  <IoIosNotifications className="small-icon" />
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/user-management">
                      User Management
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/role-management">
                      Role Management
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/settings">
                      Settings
                    </a>
                  </li>
                </ul>
                <div className="onhover-show-div notification-dropdown">
                  <h3 className="dropdown-title">Notitications</h3>
                  <div className="border-secondary border-top notifications p-3">
                    <a className="f-w-700" href="/notifications">
                      View all Notifications
                    </a>
                  </div>
                </div>
              </a>
            </li>

            <li className="nav-item">
              <div className="d-flex align-items-center">
                <FaUser className="nav-icon" />
                <div className="ps-4">
                  <p>Prianka</p>
                  <p>Software Engineer</p>
                  {/* <p className="mb-0 font-roboto">Software Engineer</p> */}
                </div>
              </div>
            </li>

            <li className="nav-item">
              <a href="/profile/" className="text-dark h5">
                <IoSettingsOutline className="profile nav-icon" />
              </a>
            </li>
            <li className="nav-item">
              <a href="/logout/">
                <RxExit className="nav-icon" />
              </a>
            </li>
          </ul>
        </div>
        {/* </FullScreen> */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
