import AppInfoItem from "@/components/AppInfoItem";
import AppTag from "@/components/AppTag";
import useModal from "@/hooks/useModal";
import {
  getDateFormat,
  getRoleLabel,
  getWorkingStatusLabel,
  mergeName
} from "@/utils";
import { Image, Typography } from "antd";
import { FC, useMemo } from "react";
import UploadAvatarModal from "../UploadAvatarModal";

const { Text } = Typography;

const EmployeeProfile: FC<{ employee: any; callbackUploadSuccess?: any }> = ({
  employee,
  callbackUploadSuccess,
}) => {
  const { showModal, handleToggleModal } = useModal();

  const deliveryValue = useMemo(() => {
    const deliveryName =
      employee?.deliveryEmployee?.delivery?.name || employee?.deliveryName;
    const isManager =
      employee?.deliveryEmployee?.isManager || employee?.isManager;
    if (deliveryName && isManager) {
      return `${deliveryName} (Manager)`;
    } else return deliveryName;
  }, [employee]);

  const avatarUrl = useMemo(() => {
    if (employee?.avatar) {
      return employee.avatar;
    }
    return "/add-avatar.svg";
  }, [employee]);

  const changeAvatar = () => {
    handleToggleModal();
  };

  return (
    <div className="employee-profile">
      <div className="left">
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="avatar"
          preview={false}
          loading="lazy"
          onClick={changeAvatar}
        />
        <Text>{mergeName(employee)}</Text>
        {employee?.position && <Text>{employee?.position?.name}</Text>}
        <AppTag color="#1e5ac7">
          {getWorkingStatusLabel(employee?.workingStatus)}
        </AppTag>
      </div>
      <div className="right">
        <AppInfoItem label="Phone" value={employee?.phoneNumber} />
        <AppInfoItem
          label="Email"
          value={employee?.employeeAccount?.email || employee?.email}
        />
        <AppInfoItem
          label="Date of birth"
          value={getDateFormat(employee?.dateOfBirth)}
        />
        <AppInfoItem label="Delivery" value={deliveryValue} />
        <AppInfoItem label="Role" value={getRoleLabel(employee?.role)} />
        <AppInfoItem
          label="Join in"
          value={getDateFormat(employee?.joinDate)}
        />
        <AppInfoItem
          label="Paid leave count"
          value={employee?.paidLeaveCount}
        />
      </div>
      <UploadAvatarModal
        employee={employee}
        showModal={showModal}
        toggleModal={handleToggleModal}
        callbackUploadSuccess={callbackUploadSuccess}
      />
    </div>
  );
};

export default EmployeeProfile;
