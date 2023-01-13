import { useRecoilValue } from "recoil";
import AppButton from "@/components/AppButton";
import { REQUEST_STATUS } from "@/constants/request";
import { useDeleteRequest, useUpdateRequest } from "@/hooks/request";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { FC, useMemo } from "react";
import { APP_ROLES } from "@/constants/common";

const { ADMIN, SUPER_ADMIN, DIVISION_MANAGER, EMPLOYEE } = APP_ROLES;

const { ACCEPTED, PENDING, REJECTED } = REQUEST_STATUS;

const ListRequestButtons: FC<{ record: any }> = ({ record }) => {
  const { employee, employeeId } = useRecoilValue(currentUserAtom);

  const {
    mutate: onUpdate,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateRequest(record.id);

  useTriggerNoti({
    isError: updateError,
    isSuccess: updateSuccess,
    messageSuccess: "Action is successful",
  });

  const handleClickAccept = () => {
    onUpdate({ status: ACCEPTED.value });
  };

  const handleClickReject = () => {
    onUpdate({ status: REJECTED.value });
  };

  const handleClickCancel = () => {
    onUpdate({ isCancelled: !record.isCancelled });
  };

  const renderCancelButton = useMemo(() => {
    if (
      employee?.role === EMPLOYEE.value ||
      (employee?.role !== EMPLOYEE.value && employeeId === record.employeeId)
    ) {
      return (
        <AppButton
          buttonTitle={record.isCancelled ? "Uncancel" : "Cancel"}
          onClick={handleClickCancel}
        />
      );
    }
    return null;
  }, [employee, record]);

  return (
    <div className="job-group-btn">
      {/* <AppButton buttonTitle="Delete" onClick={handleDeleteRequest} /> */}
      {renderCancelButton}
      {/* 2 buttons below is just admin's permission */}
      {employee?.role && employee?.role !== EMPLOYEE.value && (
        <>
          <AppButton
            buttonTitle="Accept"
            onClick={handleClickAccept}
            disabled={
              record.status === REJECTED.value ||
              record.status === ACCEPTED.value
            }
          />
          <AppButton
            buttonTitle="Reject"
            onClick={handleClickReject}
            disabled={
              record.status === ACCEPTED.value ||
              record.status === REJECTED.value
            }
          />
        </>
      )}
    </div>
  );
};

export default ListRequestButtons;
