import React from "react";
import { IAppIcon } from "./interface";

const UserIcon = ({ color = "blue", type = "primary" }: IAppIcon) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12ZM14.25 9.75C14.25 10.9926 13.2426 12 12 12C10.7574 12 9.74999 10.9926 9.74999 9.75C9.74999 8.50736 10.7574 7.5 12 7.5C13.2426 7.5 14.25 8.50736 14.25 9.75ZM7.59055 17.2572C7.49125 17.6593 7.83578 18 8.24999 18H15.75C16.1642 18 16.5087 17.6593 16.4094 17.2572C15.9872 15.5473 14.1419 14.25 12 14.25C9.85811 14.25 8.01275 15.5473 7.59055 17.2572Z"
        style={{ fill: `var(--color-${type}-${color})` }}
      />
    </svg>
  );
};

export default UserIcon;
