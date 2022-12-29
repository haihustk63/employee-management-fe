import { FC, useContext } from "react";

import AppForm from "@/components/AppForm";
import { LEAVING_TIME, REQUEST_TYPES, WORKING_TIME } from "@/constants/request";
import { dayjs } from "@/dayjs-config";
import { currentUserAtom } from "@/modules/currentUser";
import { CreateRequestContext } from "@/pages/request/create-request";
import { addCommonRequestSchema } from "@/schemas";
import { useRecoilValue } from "recoil";
import FormFields from "./FormFields";
import { IFormLeaveProps } from "./interface";
import { useCreateRequest } from "@/hooks/request";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const {
  ANNUAL_LEAVE,
  MODIFY_CHECKIN,
  MODIFY_CHECKOUT,
  OVER_TIME,
  REMOTE,
  UNPAID_LEAVE,
} = REQUEST_TYPES;

const { MORNING, AFTERNOON, ALLDAY } = LEAVING_TIME;

const { AFTERNOON_END, AFTERNOON_START, MORNING_END, MORNING_START } =
  WORKING_TIME;

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
      case MODIFY_CHECKIN: {
        const { startTime } = values;
        return `${startTime?.format("HH:mm")}-X`;
      }

      case MODIFY_CHECKOUT: {
        const { endTime } = values;
        return `X-${endTime?.format("HH:mm")}`;
      }

      case OVER_TIME: {
        const { startTime, endTime } = values;
        return `${startTime?.format("HH:mm")}-${endTime?.format("HH:mm")}`;
      }
      case UNPAID_LEAVE:
      case ANNUAL_LEAVE:
      case REMOTE:
        const { leavingTime } = values;
        if (leavingTime === MORNING) {
          return `${MORNING_START}-${MORNING_END}`;
        } else if (leavingTime === AFTERNOON) {
          return `${AFTERNOON_START}-${AFTERNOON_END}`;
        } else {
          return `${MORNING_START}-${AFTERNOON_END}`;
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
