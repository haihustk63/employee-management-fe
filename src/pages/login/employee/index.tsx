import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

import FormLogin from "@/components/pages/login/FormLogin";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { loginAsEmployee } from "@/schemas";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import { useLoginEmployee } from "@/hooks/login";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const { Title } = Typography;

const initialValueForm = {
  email: "",
  password: "",
};

// localize

const LoginEmployee = () => {
  const navigate = useNavigate();

  const { mutate: login, data, isError, isSuccess } = useLoginEmployee() as any;

  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const afterSuccessLogin = () => {
    setCurrentUser(data.data.userInfo);
    navigate(APP_PAGE_NAME_ROUTES.HOME);
  };

  useTriggerNoti({ isError, isSuccess, callbackSuccess: afterSuccessLogin });

  const handleLogin = (values: any) => {
    login(values);
  };

  return (
    <div className="login-page-form">
      <Title>Employee Login</Title>
      <FormLogin
        actor="employee"
        initialValue={initialValueForm}
        validationSchema={loginAsEmployee}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginEmployee;
