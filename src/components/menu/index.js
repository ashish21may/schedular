import React from "react";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div className="menu-container">
      <div className="text"> Schedular </div>
      <nav className="nav-container">
        <ul>
          <li>
            <Link className="nav-links" to="/dashboard">
              {" "}
              Dashboard{" "}
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/schedular">
              {" "}
              Schedule Meeting
            </Link>
          </li>
        </ul>
      </nav>
      {/* <button> Logout </button> */}
    </div>
  );
};
