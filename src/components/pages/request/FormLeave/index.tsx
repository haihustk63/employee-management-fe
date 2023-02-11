import { FC, useContext } from "react";

import AppForm from "@/components/AppForm";
import { REQUEST_TYPES } from "@/constants/request";
import { dayjs } from "@/dayjs-config";
import { useCreateRequest } from "@/hooks/request";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { CreateRequestContext } from "@/pages/request/create-request";
import FormFields from "./FormFields";
import { IFormLeaveProps } from "./interface";

const { MODIFY_CHECKIN, MODIFY_CHECKOUT, OVERTIME } = REQUEST_TYPES;

const initialValues: IFormLeaveProps = {
  date: dayjs(Date.now()),
  reason: "",
  leavingTime: undefined,
  startTime: undefined,
  endTime: undefined,
  type: undefined,
};

const FormLeave: FC = () => {
  const { schemaValidation } = useContext(CreateRequestContext) as any;
  const { mutate: onCreate, isError, isSuccess, error } = useCreateRequest();

  useTriggerNoti({
    error,
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
