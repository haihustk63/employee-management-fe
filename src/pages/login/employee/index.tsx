import { Typography } from "antd";

import FormLogin from "@/components/pages/login/FormLogin";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const initialValueForm = {
  email: "",
  password: "",
};

// localize

const LoginEmployee = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(APP_PAGE_NAME_ROUTES.HOME);
  };

  return (
    <div className="login-page-form">
      <Title>Employee Login</Title>
      <FormLogin
        actor="employee"
        initialValue={initialValueForm}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginEmployee;
