import AppButton from "@/components/AppButton";
import {
  showAppCommonConfirm,
  showDeleteConfirm,
} from "@/components/AppConfirm";
import MoreIcon from "@/components/Icons/MoreIcon";
import { APP_ROLES } from "@/constants/common";
import { REQUEST_STATUS, REQUEST_TYPES } from "@/constants/request";
import { useDeleteRequest, useUpdateRequest } from "@/hooks/request";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { Dropdown } from "antd";
import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";

const { EMPLOYEE } = APP_ROLES;

const { ACCEPTED, PENDING, REJECTED } = REQUEST_STATUS;

const ListRequestActions: FC<{ record: any }> = ({ record }) => {
  const { employee, employeeId } = useRecoilValue(currentUserAtom);
  const { mutate: onDelete, isError, isSuccess } = useDeleteRequest(record.id);

  const {
    mutate: onUpdate,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateRequest(record.id);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Action is successful",
  });

  useTriggerNoti({
    isError: updateError,
    isSuccess: updateSuccess,
    messageSuccess: "Action is successful",
  });

  const handleClickAccept = () => {
    showAppCommonConfirm({
      callback: () => onUpdate({ status: ACCEPTED.value }),
    });
  };

  const handleClickReject = () => {
    showAppCommonConfirm({
      callback: () => onUpdate({ status: REJECTED.value }),
    });
  };

  const handleClickCancel = () => {
    showAppCommonConfirm({ callback: () => onUpdate({ isCancelled: true }) });
  };

  const handleClickDelete = () => {
    showDeleteConfirm({ onDelete: onDelete });
  };

  const cancelButton = useMemo(() => {
    if (
      employee?.role === EMPLOYEE.value ||
      (employee?.role !== EMPLOYEE.value && employeeId === record.employeeId)
    ) {
      if (
        record.status === REJECTED.value ||
        (record.isAdminReviewed && record.isCancelled) ||
        (record.isAdminReviewed &&
          (record.type === REQUEST_TYPES.MODIFY_CHECKIN.value ||
            record.type === REQUEST_TYPES.MODIFY_CHECKOUT.value))
      ) {
        return null;
      } else {
        return <AppButton buttonTitle="Cancel" onClick={handleClickCancel} />;
      }
    }
    return null;
  }, [employee, record]);

  const renderAdminButtons = useMemo(() => {
    return employee?.role && employee?.role !== EMPLOYEE.value;
  }, [employee]);

  const disabledAdminButton = useMemo(() => {
    return record.status === ACCEPTED.value || record.status === REJECTED.value;
  }, [record]);

  const acceptButton = useMemo(() => {
    return renderAdminButtons ? (
      <AppButton
        buttonTitle="Accept"
        onClick={handleClickAccept}
        disabled={disabledAdminButton}
      />
    ) : null;
  }, [renderAdminButtons, disabledAdminButton]);

  const deleteButton = useMemo(() => {
    return renderAdminButtons ? (
      <AppButton
        buttonTitle="Delete"
        onClick={handleClickDelete}
        className="-danger"
      />
    ) : null;
  }, [renderAdminButtons]);

  const rejectButton = useMemo(() => {
    return renderAdminButtons ? (
      <AppButton
        buttonTitle="Reject"
        onClick={handleClickReject}
        disabled={disabledAdminButton}
      />
    ) : null;
  }, [renderAdminButtons, disabledAdminButton]);

  const dropdownItems = useMemo(() => {
    return [
      {
        key: "cancel",
        label: cancelButton,
      },
      {
        key: "accept",
        label: acceptButton,
      },
      {
        key: "reject",
        label: rejectButton,
      },
      {
        key: "delete",
        label: deleteButton,
      },
    ].filter((item) => !!item.label);
  }, [cancelButton, acceptButton, rejectButton, deleteButton]);

  return (
    <div className="job-group-btn">
      {!!dropdownItems.length && (
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
          <div>
            <MoreIcon />
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default ListRequestActions;
