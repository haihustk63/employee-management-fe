import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { APP_ROLES } from "@/constants/common";
import { useDeleteEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { EmployeeManagementContext } from "@/pages/employee";
import { Space } from "antd";
import { FC, useContext, useMemo } from "react";
import { useRecoilValue } from "recoil";

const EmployeeGroupButton: FC<{ record: any }> = ({ record }) => {
  const { employee } = useRecoilValue(currentUserAtom);
  const { toggleEmployeeProfileModal, setEmployeeId } = useContext(
    EmployeeManagementContext
  ) as any;

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

  const isShowDeleteButton = useMemo(() => {
    return (
      record.role !== APP_ROLES.ADMIN.value &&
      record.role !== APP_ROLES.SUPER_ADMIN.value &&
      employee?.role === APP_ROLES.SUPER_ADMIN.value
    );
  }, [record, employee]);

  const deleteEmployee = () => {
    showDeleteConfirm({ onDelete });
  };

  const handleClickButtonViewDetail = () => {
    setEmployeeId(record.id);
    toggleEmployeeProfileModal();
  };

  return (
    <Space>
      <AppButton
        buttonTitle="View Detail"
        htmlType="button"
        size="small"
        onClick={handleClickButtonViewDetail}
      />
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
