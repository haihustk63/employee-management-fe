import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

import FormLogin from "@/components/pages/login/FormLogin";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { loginSchema } from "@/schemas";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import { useLoginEmployee } from "@/hooks/login";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const initialValueForm = {
  email: "",
  password: "",
};

// localize

const LoginEmployee = () => {
  const navigate = useNavigate();

  const {
    mutate: login,
    data,
    isError,
    isSuccess,
    error,
  } = useLoginEmployee() as any;

  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const afterSuccessLogin = () => {
    const userInfo = data?.data?.userInfo;
    if (userInfo) {
      setCurrentUser(userInfo);
      const employeeId = userInfo?.employeeId;
      if (employeeId) {
        navigate(APP_PAGE_NAME_ROUTES.HOME);
      } else {
        navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
      }
    }
  };

  useTriggerNoti({
    isError,
    isSuccess,
    callbackSuccess: afterSuccessLogin,
    messageSuccess: "You logged in successfully",
    messageError: error?.response?.data,
  });

  const handleLogin = (values: any) => {
    login(values);
  };

  return (
    <div className="login-page">
      <FormLogin
        initialValue={initialValueForm}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginEmployee;
