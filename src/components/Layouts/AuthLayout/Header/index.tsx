import React from "react";
import { Link } from "react-router-dom";

import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

//localize

const Header = () => {
  return (
    <div className="auth-layout-header">
      <ul className="list">
        <div className="left">
          <li className="item">
            <Link to={APP_PAGE_NAME_ROUTES.LOGIN}>Home</Link>
          </li>
          <li>
            <a href="https://youtube.com">Recruiment Page</a>
          </li>
        </div>
        <div className="right">
          <li>
            <Link to={APP_PAGE_NAME_ROUTES.LOGIN_CANDIDATE}>Candidate Login</Link>
          </li>
          <li>
            <Link to={APP_PAGE_NAME_ROUTES.LOGIN_EMPLOYEE}>Employee Login</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Header;
