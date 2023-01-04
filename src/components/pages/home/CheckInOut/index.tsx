import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Typography } from "antd";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import DateTime from "@/components/DateTime";
import { currentUserAtom } from "@/modules/currentUser";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useCheckInOut, useGetCheckInOutInfo } from "@/hooks/check-in-out";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { getTime } from "@/utils";
import appNotification from "@/components/AppNotification";

const { Title, Text } = Typography;

const CheckInOut = () => {
  const navigate = useNavigate();

  const currentUser = useRecoilValue(currentUserAtom);
  const { name } = currentUser;

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
        <Title level={2}>Hello {name}</Title>
        <DateTime />
      </div>
      <div className="cards">
        <AppPrimaryCard title="Check in" hasBoxShadow backgroundColor="info">
          {!!checkedIn.time ? (
            <Title>{getTime(checkedIn.time)}</Title>
          ) : (
            <Text>You have not checked in</Text>
          )}
        </AppPrimaryCard>
        <AppPrimaryCard title="Check out" hasBoxShadow backgroundColor="info">
          {checkedOut.time ? (
            <Title>{getTime(checkedOut.time)}</Title>
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
