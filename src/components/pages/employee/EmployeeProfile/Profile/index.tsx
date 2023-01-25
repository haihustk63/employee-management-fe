import React, { FC, useMemo } from "react";
import { Image, Typography } from "antd";
import {
  getDateFormat,
  getRoleLabel,
  getWorkingStatusLabel,
  mergeName,
} from "@/utils";
import AppInfoItem from "@/components/AppInfoItem";

const { Text } = Typography;

const EmployeeProfile: FC<{ employee: any }> = ({ employee }) => {
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
    return "https://i0.wp.com/www.mobiflip.de/wp-content/uploads/2022/12/avatar-2-film-detail.jpg?fit=1200%2C960&ssl=1";
  }, [employee]);

  return (
    <div className="employee-profile">
      <div className="left">
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="avatar"
          preview={false}
          loading="lazy"
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
    </div>
  );
};

export default EmployeeProfile;
