import { ROLES } from "@/constants/common";
import { currentUserAtom } from "@/modules/currentUser";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const ProtectedRoute: FC<{ route: any; children: any }> = ({
  route,
  children,
}) => {
  const currentUser = useRecoilValue(currentUserAtom);

  // if (Object.keys(currentUser).length === 0) {
  //   if (!/^\/login/g.test(route.path)) {
  //     return <Navigate to="/login" replace />;
  //   }
  // } else {
  //   if (route.path === "/login" && !currentUser.role) {
  //     return <Navigate to="/skill-test" replace />;
  //   }
  //   if (route.path === "/login" && currentUser.role) {
  //     return <Navigate to="/" replace />;
  //   }
  // }

  // if (!currentUser.role && route.role && route.role.priority > 0) {
  //   return <Navigate to="/skill-test" replace />;
  // }

  // if (currentUser.role && route.role) {
  //   const currentPriority = ROLES[currentUser.role].priority;
  //   if (currentPriority < route.role.priority || route.role.priority === 0) {
  //     return <Navigate to="/" replace />;
  //   }
  // }

  return children;
};

export default ProtectedRoute;
