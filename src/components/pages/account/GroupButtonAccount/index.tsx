import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { APP_ROLES } from "@/constants/common";
import { useDeleteAccount, useUpdateAccount } from "@/hooks/account";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { AccountManagementContext } from "@/pages/account";
import { Space } from "antd";
import { FC, useContext, useMemo } from "react";

const GroupButtonAccount: FC<{ record: any }> = ({ record }) => {
  const { mutate, isError, isSuccess } = useDeleteAccount();
  const { toggleAssignModal, setAccount } = useContext(
    AccountManagementContext
  ) as any;

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Delete account successfully",
  });

  const onClickAssignButton = () => {
    setAccount(record?.email);
    toggleAssignModal();
  };

  const renderButtonAssignAccount = useMemo(() => {
    if (!record?.employeeId && !record?.candidateId) {
      return (
        <AppButton
          buttonTitle="Assign"
          size="small"
          onClick={onClickAssignButton}
        />
      );
    }
    return null;
  }, [record]);

  const handleClickDelete = () => {
    showDeleteConfirm({ onDelete: () => mutate({ email: record.email }) });
  };

  return (
    <div>
      {record.employee?.role !== APP_ROLES.ADMIN.value &&
        record.employee?.role !== APP_ROLES.SUPER_ADMIN.value && (
          <Space>
            {renderButtonAssignAccount}
            <AppButton
              buttonTitle="Delete"
              size="small"
              className="-danger"
              onClick={handleClickDelete}
            />
          </Space>
        )}
    </div>
  );
};

export default GroupButtonAccount;
