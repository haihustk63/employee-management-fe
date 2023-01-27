import AppButton from "@/components/AppButton";
import { showDeleteConfirm } from "@/components/AppConfirm";
import { APP_ROLES } from "@/constants/common";
import { useDeleteAccount, useUpdateAccount } from "@/hooks/account";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { AccountManagementContext } from "@/pages/account";
import { Space } from "antd";
import { FC, useContext, useMemo } from "react";
import { useRecoilValue } from "recoil";

const GroupButtonAccount: FC<{ record: any }> = ({ record }) => {
  const { employee } = useRecoilValue(currentUserAtom);
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

  const handleClickDelete = () => {
    showDeleteConfirm({ onDelete: () => mutate({ email: record.email }) });
  };

  const roleAdmin = useMemo(() => {
    if (employee) {
      return employee?.role === APP_ROLES.ADMIN.value;
    }
  }, [employee]);

  const roleSuperAdmin = useMemo(() => {
    if (employee) {
      return employee?.role === APP_ROLES.SUPER_ADMIN.value;
    }
  }, [employee]);

  const accountIsAdmin = useMemo(() => {
    return (
      record?.employee?.role === APP_ROLES.ADMIN.value ||
      record?.employee?.role === APP_ROLES.SUPER_ADMIN.value
    );
  }, [record]);

  const accountIsSuperAdmin = useMemo(() => {
    return record?.employee?.role === APP_ROLES.SUPER_ADMIN.value;
  }, [record]);

  const accountNotAssignYet = useMemo(() => {
    return !record?.employeeId && !record?.candidateId;
  }, [record]);

  const renderButtonAssignAccount = useMemo(() => {
    if ((roleAdmin || roleSuperAdmin) && accountNotAssignYet) {
      return (
        <AppButton
          buttonTitle="Assign"
          size="small"
          onClick={onClickAssignButton}
        />
      );
    }
    return null;
  }, [roleAdmin, roleSuperAdmin, accountNotAssignYet]);

  const renderButtonDelete = useMemo(() => {
    if (
      (roleSuperAdmin || (roleAdmin && !accountIsAdmin)) &&
      !accountIsSuperAdmin
    ) {
      return (
        <AppButton
          buttonTitle="Delete"
          size="small"
          className="-danger"
          onClick={handleClickDelete}
        />
      );
    }
  }, []);

  return (
    <div>
      <Space>
        {renderButtonAssignAccount}
        {renderButtonDelete}
      </Space>
    </div>
  );
};

export default GroupButtonAccount;
