import { Typography } from "antd";
import { useEffect, useMemo } from "react";
import Countdown, { CountdownApi } from "react-countdown";

const { Text } = Typography;

const AppCountDown = ({
  seconds = 0,
  start,
  callback,
}: {
  seconds?: number;
  start?: boolean;
  callback?: any;
}) => {
  let countdownApi: CountdownApi | null = null;

  useEffect(() => {
    if (start && countdownApi) {
      countdownApi.start();
    }
  }, [start]);

  const renderer = ({
    completed,
    seconds: currentSeconds,
    minutes: currentMinutes,
    hours: currentHours,
    formatted: { hours, minutes, seconds },
  }: any) => {
    if (completed) {
      return <Text>Done!</Text>;
    } else {
      callback(currentSeconds + currentMinutes * 60 + currentHours * 3600);
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
    return Date.now() + seconds * 1000;
  }, [seconds]);

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
