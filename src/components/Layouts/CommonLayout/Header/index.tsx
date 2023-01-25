import UserIcon from "@/components/Icons/UserIcon";
import { useLogoutEmployee } from "@/hooks/login";
import { breadCrumbAtom } from "@/modules/breadcrumb";
import { currentUserAtom } from "@/modules/currentUser";
import { mergeName } from "@/utils";
import { Dropdown, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const { Header } = Layout;
const { Text } = Typography;

const CommonHeader = () => {
  const setBreadCrumb = useSetRecoilState(breadCrumbAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const { mutate: logout } = useLogoutEmployee();

  const navigate = useNavigate();

  const handleClickHeaderItem = ({ keyPath, key }: any) => {
    const newBreadCrumb = keyPath
      ?.map((item: string) => {
        if (item === "/") return "HOME";
        return item.replaceAll(/[\/-]/g, " ").trim().toUpperCase();
      })
      .reverse();
    setBreadCrumb(newBreadCrumb);
    navigate(key);
  };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    logout("");
  };

  const personalMenu = [
    {
      key: "/personal-info",
      label: "Profile",
      onClick: () => navigate("/personal-info"),
    },
    {
      key: "/change-password",
      label: "Change password",
      onClick: () => navigate("/change-password"),
    },
    {
      key: "/logout",
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Header className="common-header">
      <div className="logo">
        <img
          src="https://www.logodesign.net/logo/abstract-hr-person-inside-location-pin-742ld.png?nwm=1&nws=1&industry=employment-hr&sf="
          alt="Logo"
          className="image"
        />
      </div>

      <div className="personal">
        <Text className="name">{mergeName(currentUser?.employee)}</Text>
        <Dropdown
          menu={{ items: personalMenu }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div>
            <UserIcon />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default CommonHeader;
