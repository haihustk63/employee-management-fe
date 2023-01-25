import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import appNotification from "@/components/AppNotification";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useCheckInOut, useGetCheckInOutInfo } from "@/hooks/check-in-out";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { getDateNow, getTime, mergeName } from "@/utils";

const { Title, Text } = Typography;

const CheckInOut = () => {
  const navigate = useNavigate();

  const { employee } = useRecoilValue(currentUserAtom);

  const {
    mutate: onCheckIn,
    isError: checkInError,
    isSuccess: checkInSuccess,
  } = useCheckInOut(0);
  const {
    mutate: onCheckOut,
    isError: checkOutError,
    isSuccess: checkOutSuccess,
  } = useCheckInOut(1);

  const { data: checkedIn = {} } = useGetCheckInOutInfo(0) as any;
  const { data: checkedOut = {} } = useGetCheckInOutInfo(1) as any;

  useTriggerNoti({
    isSuccess: checkInSuccess,
    isError: checkInError,
    messageSuccess: "You have been checked in successfully",
  });

  useTriggerNoti({
    isSuccess: checkOutSuccess,
    isError: checkOutError,
    messageSuccess: "You have been checked out successfully",
  });

  const handleNavigateRequest = () => {
    navigate(APP_PAGE_NAME_ROUTES.REQUEST_CREATE);
  };

  const handleCheckIn = () => {
    onCheckIn({ type: 0 });
  };

  const handleCheckOut = () => {
    if (!checkedIn?.isChecked) {
      appNotification({
        message: "Failes",
        description: "You must check in first",
        type: "error",
      });
      return;
    }
    onCheckOut({ type: 1 });
  };

  return (
    <div className="home-check-in-out">
      <div className="user">
        <Title level={2}>Hello {mergeName(employee)}</Title>
        <Text>Today is: {getDateNow()}</Text>
      </div>
      <div className="cards">
        <AppPrimaryCard title="Checkin" borderColor="blue" borderType="dashed">
          {!!checkedIn.time ? (
            <Text className="time">{getTime(checkedIn.time)}</Text>
          ) : (
            <Text>You have not checked in</Text>
          )}
        </AppPrimaryCard>
        <AppPrimaryCard title="Checkout" borderColor="blue" borderType="dashed">
          {checkedOut.time ? (
            <Text className="time">{getTime(checkedOut.time)}</Text>
          ) : (
            <Text>You have not checked out</Text>
          )}
        </AppPrimaryCard>
      </div>
      <div className="function">
        <AppButton
          buttonTitle="Checkin"
          onClick={handleCheckIn}
          disabled={checkedIn?.isChecked}
        />
        <AppButton
          buttonTitle="Checkout"
          onClick={handleCheckOut}
          disabled={checkedOut?.isChecked}
        />
        <AppButton
          buttonTitle="Add new request"
          onClick={handleNavigateRequest}
        />
      </div>
    </div>
  );
};

export default CheckInOut;
