import appNotification from "@/components/AppNotification";
import { useEffect, useMemo } from "react";

interface ITriggerNoti {
  error?: any;
  isSuccess?: boolean;
  isError?: boolean;
  messageSuccess?: string;
  messageError?: string;
  showMessageSuccess?: boolean;
  showMessageError?: boolean;
  callbackSuccess?: () => void;
  callbackError?: () => void;
}

export const useTriggerNoti = ({
  error,
  isSuccess,
  isError,
  messageSuccess,
  messageError,
  showMessageError = true,
  showMessageSuccess = true,
  callbackSuccess,
  callbackError,
}: ITriggerNoti) => {
  const errorMessage = useMemo(() => {
    if (messageError) {
      return messageError;
    }
    if (error) {
      return typeof error?.response?.data === "object"
        ? error?.response?.data?.message
        : error?.response?.data;
    }
    return "Error";
  }, [error]);
  useEffect(() => {
    if (isSuccess) {
      if (showMessageSuccess)
        appNotification({
          type: "success",
          message: "Success",
          description: messageSuccess || "Action is successful",
        });
      callbackSuccess?.();
    }
  }, [isSuccess, showMessageSuccess]);

  useEffect(() => {
    if (isError) {
      if (showMessageError)
        appNotification({
          type: "error",
          message: "Error",
          description: errorMessage || "Something went wrong",
        });
      callbackError?.();
    }
  }, [isError, showMessageError]);
};
