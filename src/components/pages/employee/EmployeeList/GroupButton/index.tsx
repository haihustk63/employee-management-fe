import AppButton from "@/components/AppButton";
import {
  showAppCommonConfirm,
  showDeleteConfirm
} from "@/components/AppConfirm";
import { APP_ROLES } from "@/constants/common";
import {
  useDeleteEmployeeProfile,
  useUpdateEmployeeProfile
} from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { EmployeeManagementContext } from "@/pages/employee";
import { dataWithHeader } from "@/utils";
import { Space } from "antd";
import { FC, useContext, useMemo } from "react";
import { useRecoilValue } from "recoil";

const EmployeeGroupButton: FC<{ record: any }> = ({ record = {} }) => {
  const { employee } = useRecoilValue(currentUserAtom);
  const { toggleEmployeeProfileModal, setEmployeeId } = useContext(
    EmployeeManagementContext
  ) as any;

  const {
    mutate: setAdmin,
    isError: setAdminError,
    isSuccess: setAdminSuccess,
    error: setAdminErrorObj,
  } = useUpdateEmployeeProfile(record.id);

  const {
    mutate: onDelete,
    isError,
    isSuccess,
  } = useDeleteEmployeeProfile(record.id);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Delete employee profile successfully",
  });

  useTriggerNoti({
    isError: setAdminError,
    isSuccess: setAdminSuccess,
    messageSuccess: "Set employee to be admin successfully",
    error: setAdminErrorObj,
  });

  const recordIsAdmin = useMemo(() => {
    return (
      record.role === APP_ROLES.ADMIN.value ||
      record.role === APP_ROLES.SUPER_ADMIN.value
    );
  }, [record]);

  const recordIsSuperAdmin = useMemo(() => {
    return record.role === APP_ROLES.SUPER_ADMIN.value;
  }, [record]);

  const isShowDeleteButton = useMemo(() => {
    return (
      (employee?.role === APP_ROLES.SUPER_ADMIN.value && !recordIsSuperAdmin) ||
      (employee?.role === APP_ROLES.ADMIN.value && !recordIsAdmin)
    );
  }, [employee]);

  const isShowSetAdminButton = useMemo(() => {
    return employee?.role === APP_ROLES.SUPER_ADMIN.value && !recordIsAdmin;
  }, [employee, recordIsAdmin]);

  const deleteEmployee = () => {
    showDeleteConfirm({ onDelete });
  };

  const handleClickButtonViewDetail = () => {
    setEmployeeId(record.id);
    toggleEmployeeProfileModal();
  };

  const onSetAdmin = () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ role: APP_ROLES.ADMIN.value }));
    setAdmin(dataWithHeader(formData));
  };

  const onClickSetAdmin = () => {
    showAppCommonConfirm({ callback: onSetAdmin });
  };

  return (
    <Space>
      <AppButton
        buttonTitle="Detail"
        htmlType="button"
        size="small"
        onClick={handleClickButtonViewDetail}
      />
      {isShowSetAdminButton && (
        <AppButton
          buttonTitle="Set Admin"
          htmlType="button"
          size="small"
          onClick={onClickSetAdmin}
        />
      )}
      {isShowDeleteButton && (
        <AppButton
          buttonTitle="Delete"
          htmlType="button"
          size="small"
          className="-danger"
          onClick={deleteEmployee}
        />
      )}
    </Space>
  );
};

export default EmployeeGroupButton;
