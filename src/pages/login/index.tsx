import { useNavigate } from "react-router-dom";

import FormLogin from "@/components/pages/login/FormLogin";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { loginSchema } from "@/schemas";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import { useLoginEmployee } from "@/hooks/login";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { firebaseAuth } from "@/config/firebase";
import { useLoginWithFirebase } from "@/hooks/firebase";
import { createContext } from "react";

const { signInWithPopup, getAuth, deleteUser, GoogleAuthProvider } =
  firebaseAuth;

export const LoginContext = createContext({});

const initialValueForm = {
  email: "",
  password: "",
};

const LoginEmployee = () => {
  const navigate = useNavigate();

  const {
    mutate: login,
    data: dataLogin,
    isError,
    isSuccess,
    error,
  } = useLoginEmployee() as any;

  const {
    mutate: loginGoogle,
    isError: isErrorLoginGoogle,
    isSuccess: isSuccessLoginGoogle,
    error: errorLoginGoogle,
    data: dataLoginGoogle,
  } = useLoginWithFirebase();

  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const afterSuccessLogin = (data: any) => () => {
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

  const loginGoogleFail = () => {
    const userLoginFailed = getAuth().currentUser;
    deleteUser(userLoginFailed!);
  };

  useTriggerNoti({
    isError,
    isSuccess,
    callbackSuccess: afterSuccessLogin(dataLogin),
    messageSuccess: "You logged in successfully",
    error,
  });

  useTriggerNoti({
    isError: isErrorLoginGoogle,
    isSuccess: isSuccessLoginGoogle,
    callbackSuccess: afterSuccessLogin(dataLoginGoogle),
    callbackError: loginGoogleFail,
    messageSuccess: "You logged in successfully",
    error: errorLoginGoogle,
  });

  const handleLogin = (values: any) => {
    login(values);
  };

  const loginWithGoogle = async () => {
    const auth = getAuth();
    const userLogin = await signInWithPopup(auth, new GoogleAuthProvider());
    const {
      user: { uid },
    } = userLogin;

    loginGoogle({ uid });
  };

  return (
    <LoginContext.Provider value={{ loginWithGoogle }}>
      <div className="login-page">
        <FormLogin
          initialValue={initialValueForm}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        />
      </div>
    </LoginContext.Provider>
  );
};

export default LoginEmployee;
