import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

import FormLogin from "@/components/pages/login/FormLogin";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { loginAsCandidate } from "@/schemas";
import { useLoginCandidate } from "@/hooks/login";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";

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

  useEffect(() => {
    if (isSuccess) {
      setCurrentUser(data.data.userInfo);
      navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log("error");
    }
  }, [isError]);

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
