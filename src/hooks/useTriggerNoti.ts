import appNotification from "@/components/AppNotification";
import { useEffect } from "react";

interface ITriggerNoti {
  isSuccess?: boolean;
  isError?: boolean;
  messageSuccess?: string;
  messageError?: string;
  callbackSuccess?: () => void;
  callbackError?: () => void;
}

export const useTriggerNoti = ({
  isSuccess,
  isError,
  messageSuccess,
  messageError,
  callbackError,
  callbackSuccess,
}: ITriggerNoti) => {
  useEffect(() => {
    if (isSuccess) {
      appNotification({
        type: "success",
        message: "Success",
        description: messageSuccess || "Action is successful",
      });
      callbackSuccess?.();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      appNotification({
        type: "error",
        message: "Error",
        description: messageError || "Something went wrong",
      });
      callbackError?.();
    }
  }, [isError]);
};
