import { FC, useContext } from "react";

import AppForm from "@/components/AppForm";
import { LEAVING_TIME, REQUEST_TYPES, WORKING_TIME } from "@/constants/request";
import { dayjs } from "@/dayjs-config";
import { useCreateRequest } from "@/hooks/request";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { CreateRequestContext } from "@/pages/request/create-request";
import { useRecoilValue } from "recoil";
import FormFields from "./FormFields";
import { IFormLeaveProps } from "./interface";

const {
  MODIFY_CHECKIN,
  MODIFY_CHECKOUT,
  OVERTIME,
  // ANNUAL_LEAVE,
  // ANNUAL_AFTERNOON_LEAVE,
  // ANNUAL_MORNING_LEAVE,
  // REMOTE,
  // REMOTE_AFTERNOON,
  // REMOTE_MORNING,
  // UNPAID_LEAVE,
  // UNPAID_AFTERNOON_LEAVE,
  // UNPAID_MORNING_LEAVE,
} = REQUEST_TYPES;

const initialValues: IFormLeaveProps = {
  date: dayjs(Date.now()),
  reason: "",
  leavingTime: undefined,
  startTime: undefined,
  endTime: undefined,
  type: undefined,
};

const FormLeave: FC = () => {
  const { employeeId = "" } = useRecoilValue(currentUserAtom);
  const { schemaValidation } = useContext(CreateRequestContext) as any;
  const { mutate: onCreate, isError, isSuccess } = useCreateRequest();

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "A request is created successfully",
  });

  const createDuration = (values: any) => {
    const { type } = values;

    switch (type) {
      case MODIFY_CHECKIN.value: {
        const { startTime } = values;
        return `${startTime?.format("HH:mm")}-X`;
      }

      case MODIFY_CHECKOUT.value: {
        const { endTime } = values;
        return `X-${endTime?.format("HH:mm")}`;
      }

      case OVERTIME.value: {
        const { startTime, endTime } = values;
        return `${startTime?.format("HH:mm")}-${endTime?.format("HH:mm")}`;
      }

      default:
        return "";
    }
  };

  const handleSubmitForm = (values: any) => {
    const { date, reason, type } = values;
    const duration = createDuration(values);
    const sendData = {
      employeeId,
      type,
      date,
      duration,
      reason,
    };

    onCreate(sendData);
  };

  return (
    <AppForm<typeof initialValues>
      title="Leave Application"
      handleSubmitForm={handleSubmitForm}
      initialValues={initialValues}
      validationSchema={schemaValidation}
    >
      <FormFields />
    </AppForm>
  );
};

export default FormLeave;
