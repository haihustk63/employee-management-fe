import LockIcon from "@/components/Icons/LockIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import UserIcon from "@/components/Icons/UserIcon";
import { useLogoutEmployee } from "@/hooks/login";
import { currentUserAtom } from "@/modules/currentUser";
import { getRoleLabel, mergeName } from "@/utils";
import { BellFilled } from "@ant-design/icons";
import {
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";
import { Avatar, Badge, Dropdown, Image, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const { Header } = Layout;
const { Text } = Typography;

const CommonHeader = () => {
  // const setBreadCrumb = useSetRecoilState(breadCrumbAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const { mutate: logout } = useLogoutEmployee();

  const navigate = useNavigate();

  // const handleClickHeaderItem = ({ keyPath, key }: any) => {
  //   const newBreadCrumb = keyPath
  //     ?.map((item: string) => {
  //       if (item === "/") return "HOME";
  //       return item.replaceAll(/[\/-]/g, " ").trim().toUpperCase();
  //     })
  //     .reverse();
  //   setBreadCrumb(newBreadCrumb);
  //   navigate(key);
  // };

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    logout("");
  };

  const personalMenu = [
    {
      key: "/personal-info",
      label: "Profile",
      icon: <UserIcon />,
      onClick: () => navigate("/personal-info"),
    },
    {
      key: "/change-password",
      label: "Change password",
      icon: <LockIcon />,
      onClick: () => navigate("/change-password"),
    },
    {
      key: "/logout",
      label: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  const onClickNotification = (notification: any) => {
    navigate(notification.payload?.path);
  };

  return (
    <NovuProvider
      subscriberId={currentUser?.employee?.id?.toString()}
      applicationIdentifier={import.meta.env.VITE_NOVU_APP_ID}
    >
      <Header className="common-header">
        <div className="logo">
          <Image src="/logo-tran-blue.png" alt="Logo" preview={false} />
        </div>

        <div className="personal">
          <Dropdown
            menu={{ items: personalMenu }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="personal-menu"
          >
            <div>
              {currentUser.employee?.avatar ? (
                <Avatar src={currentUser.employee.avatar} alt="Avatar" />
              ) : (
                <UserIcon />
              )}
            </div>
          </Dropdown>
          <div className="namerole">
            <Text className="name">{mergeName(currentUser?.employee)}</Text>
            <Text className="role">
              {getRoleLabel(currentUser.employee?.role)}
            </Text>
          </div>
          <PopoverNotificationCenter
            colorScheme="light"
            onNotificationClick={onClickNotification}
          >
            {({ unseenCount }) => (
              <Badge
                count={unseenCount}
                size="small"
                className="bell"
                dot={true}
              >
                <BellFilled />
              </Badge>
            )}
          </PopoverNotificationCenter>
        </div>
      </Header>
    </NovuProvider>
  );
};

export default CommonHeader;
