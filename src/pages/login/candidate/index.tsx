import React from "react";
import { Typography } from "antd";

import FormLogin from "@/components/pages/login/FormLogin";
import { useNavigate } from "react-router-dom";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

const { Title } = Typography;

const initialValueForm = {
  username: "",
  password: "",
};

// localize

const LoginCandidate = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
  };
  
  return (
    <div className="login-page-form">
      <Title>Candidate Login</Title>
      <FormLogin
        actor="candidate"
        initialValue={initialValueForm}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginCandidate;
