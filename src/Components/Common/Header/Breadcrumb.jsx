import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb" className="align-items-center">
      <ol style={{ listStyle: "none" }} className="p-0 m-0 d-flex">
        <li>
          <Link to={"/"} style={{ textDecoration: "none", color: "#0D5178" }}>
            <FaHome className="nav-icon" />
          </Link>
          <span style={{ margin: "0 8px" }}>\</span>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {item.link ? (
                <Link
                  to={item.link}
                  style={{ textDecoration: "none", color: "#0D5178" }}
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
            {/* Add backslash separator, except for the last item */}
            {index < items.length - 1 && (
              <span style={{ margin: "0 8px" }}>\</span>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
