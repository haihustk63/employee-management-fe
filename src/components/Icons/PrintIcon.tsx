import React from "react";
import { IAppIcon } from "./interface";

const PrintIcon = ({ color = "blue", type = "primary" }: IAppIcon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 512 512"
      className="svg-icon"
    >
      <rect width="512" height="512" rx="15%" fill="#fff" />
      <path
        d="M416.155 164.483H95.845c-38.895 0-68.638 29.743-68.638 68.638v137.275h91.517v91.518h274.552v-91.518h91.517V233.121c0-38.895-29.743-68.638-68.638-68.638zm-68.638 251.672H164.483V301.759h183.034v114.396zM416.155 256c-13.728 0-22.879-9.152-22.879-22.879 0-13.728 9.151-22.88 22.879-22.88 13.728 0 22.879 9.152 22.879 22.88 0 13.727-9.151 22.879-22.879 22.879zM393.276 50.086H118.724v91.518h274.552V50.086z"
        style={{ fill: `var(--color-${type}-${color})` }}
      />
    </svg>
  );
};

export default PrintIcon;
