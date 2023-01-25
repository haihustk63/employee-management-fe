import EmployeeProfile from "@/components/pages/employee/EmployeeProfile/Profile";
import { currentUserAtom } from "@/modules/currentUser";
import React from "react";
import { useRecoilValue } from "recoil";

const PersonalInfoDetail = () => {
  const { employee } = useRecoilValue(currentUserAtom);
  return <EmployeeProfile employee={employee} />;
};

export default PersonalInfoDetail;
