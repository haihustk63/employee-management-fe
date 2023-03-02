import AppButton from "@/components/AppButton";
import { HEADER_CANDIDATE_ITEMS } from "@/constants/common";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useLogoutEmployee } from "@/hooks/login";
import { currentUserAtom } from "@/modules/currentUser";
import { Image, Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const { Header } = Layout;

const CandidateLayoutHeader = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const { mutate: logout } = useLogoutEmployee();

  const handleClickHeaderItem = ({ keyPath, key }: any) => {
    navigate(key);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    logout("");
  };

  const navigateToChangePassword = () => {
    navigate(APP_PAGE_NAME_ROUTES.CHANGE_PASSWORD_CANDIDATE);
  };

  const navigateSkillTest = () => {
    navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
  };

  return (
    <Header className="candidate-layout-header">
      <div className="logo" onClick={navigateSkillTest}>
        <Image src="/logo-tran-blue.png" alt="Logo" preview={false} />
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        className="menu"
        onClick={handleClickHeaderItem}
        items={HEADER_CANDIDATE_ITEMS}
      />
      <AppButton
        buttonTitle="Change password"
        onClick={navigateToChangePassword}
      />
      <AppButton buttonTitle="Logout" onClick={handleLogout} />
    </Header>
  );
};

export default CandidateLayoutHeader;
