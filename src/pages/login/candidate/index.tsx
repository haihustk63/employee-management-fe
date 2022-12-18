import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

import FormLogin from "@/components/pages/login/FormLogin";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { loginAsCandidate } from "@/schemas";
import { useLoginCandidate } from "@/hooks/login";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const { Title } = Typography;

const initialValueForm = {
  username: "",
  password: "",
};

// localize

const LoginCandidate = () => {
  const navigate = useNavigate();
  
  const {
    mutate: login,
    data,
    isError,
    isSuccess,
  } = useLoginCandidate() as any;

  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const afterSuccessLogin = () => {
    setCurrentUser(data.data.userInfo);
    navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
  };

  useTriggerNoti({ isError, isSuccess, callbackSuccess: afterSuccessLogin });

  const handleLogin = (values: any) => {
    login(values);
  };

  return (
    <div className="login-page-form">
      <Title>Candidate Login</Title>
      <FormLogin
        actor="candidate"
        initialValue={initialValueForm}
        validationSchema={loginAsCandidate}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default LoginCandidate;
