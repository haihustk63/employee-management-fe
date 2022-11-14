import { currentUserAtom } from "@/modules/currentUser";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const ProtectedRoute: FC<{ route: any; children: any }> = ({
  route,
  children,
}) => {
  const currentUser = useRecoilValue(currentUserAtom);

  if (route?.role > currentUser.role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
