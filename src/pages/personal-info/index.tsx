import React from "react";
import { Outlet } from "react-router-dom";

const PersonalInfo = () => {
  return (
    <div>
      PersonalInfo
      <Outlet />
    </div>
  );
};

export default PersonalInfo;
