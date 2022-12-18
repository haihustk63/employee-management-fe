import React, { useEffect, useMemo } from "react";
import { Typography } from "antd";
import Countdown, { CountdownApi } from "react-countdown";

const { Text } = Typography;

const AppCountDown = ({
  hour = 0,
  minute = 0,
  start,
}: {
  hour?: number;
  minute?: number;
  start?: boolean;
}) => {
  let countdownApi: CountdownApi | null = null;

  useEffect(() => {
    if (start && countdownApi) {
      countdownApi.start();
    }
  }, [start]);

  const renderer = ({
    completed,
    formatted: { hours, minutes, seconds },
  }: any) => {
    if (completed) {
      return <Text>Done!</Text>;
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const setRef = (countdown: Countdown | null) => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const target = useMemo(() => {
    return Date.now() + (hour * 3600 + minute * 60) * 1000;
  }, [hour, minute]);

  return (
    <div className="app-countdown">
      <Countdown
        date={target}
        renderer={renderer}
        autoStart={false}
        ref={setRef}
      />
    </div>
  );
};

export default AppCountDown;
