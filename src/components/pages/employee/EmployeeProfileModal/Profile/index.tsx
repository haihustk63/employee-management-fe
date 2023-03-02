import React, { FC, useMemo } from "react";
import { Image, Typography } from "antd";
import {
  getDateFormat,
  getRoleLabel,
  getWorkingStatusLabel,
  mergeName,
} from "@/utils";
import AppInfoItem from "@/components/AppInfoItem";
import UploadAvatarModal from "../UploadAvatarModal";
import useModal from "@/hooks/useModal";

const { Text } = Typography;

const EmployeeProfile: FC<{ employee: any; callbackUploadSuccess?: any }> = ({
  employee,
  callbackUploadSuccess,
}) => {
  const { showModal, handleToggleModal } = useModal();

  const deliveryValue = useMemo(() => {
    const delivery = employee?.deliveryEmployee?.delivery;
    const isManager = employee?.deliveryEmployee?.isManager;
    if (delivery && isManager) {
      return `${delivery?.name} (Manager)`;
    } else return delivery?.name;
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
        <Text>{getWorkingStatusLabel(employee?.workingStatus)}</Text>
      </div>
      <div className="right">
        <AppInfoItem label="Phone" value={employee?.phoneNumber} />
        <AppInfoItem label="Email" value={employee?.employeeAccount?.email} />
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
