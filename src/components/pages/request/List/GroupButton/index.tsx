import AppButton from "@/components/AppButton";
import { REQUEST_STATUS } from "@/constants/request";
import { useDeleteRequest, useUpdateRequest } from "@/hooks/request";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { FC } from "react";

const { ACCEPTED, PENDING, REJECTED } = REQUEST_STATUS;

const ListRequestButtons: FC<{ record: any }> = ({ record }) => {
  const { mutate: onDelete, isError, isSuccess } = useDeleteRequest(record.id);
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

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: `Delete request successfully`,
  });

  const handleDeleteRequest = () => {
    onDelete("");
  };

  const handleClickAccept = () => {
    onUpdate({ status: ACCEPTED.value });
  };

  const handleClickReject = () => {
    onUpdate({ status: REJECTED.value });
  };

  const handleClickCancel = () => {
    onUpdate({ isCancelled: !record.isCancelled, status: 1 });
  };

  return (
    <div className="job-group-btn">
      <AppButton buttonTitle="View Detail" onClick={null} />
      <AppButton buttonTitle="Delete" onClick={handleDeleteRequest} />
      <AppButton
        buttonTitle={record.isCancelled ? "Uncancel" : "Cancel"}
        onClick={handleClickCancel}
      />
      {/* 2 buttons below is just admin's permission */}
      <AppButton
        buttonTitle="Accept"
        onClick={handleClickAccept}
        disabled={
          record.status === REJECTED.value || record.status === ACCEPTED.value
        }
      />
      <AppButton
        buttonTitle="Reject"
        onClick={handleClickReject}
        disabled={
          record.status === ACCEPTED.value || record.status === REJECTED.value
        }
      />
    </div>
  );
};

export default ListRequestButtons;
