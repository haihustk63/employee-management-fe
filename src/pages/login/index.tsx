import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Typography } from "antd";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

const { Title, Text } = Typography;

//localize

const Login = () => {
  const navigate = useNavigate();

  const handleToLoginForm = (actor: string) => () => {
    navigate(`/login/${actor}`);
  };

  return (
    <div className="login-page">
      <div className="select">
        <AppPrimaryCard
          title="Candidate Login"
          hasBoxShadow
          onClick={handleToLoginForm("candidate")}
        >
          <Text>Click here to login as a candidate</Text>
        </AppPrimaryCard>
        <AppPrimaryCard
          title="Employee Login"
          hasBoxShadow
          onClick={handleToLoginForm("employee")}
        >
          <Text>Click here to login as a employee</Text>
        </AppPrimaryCard>
      </div>
    </div>
  );
};

export default Login;
