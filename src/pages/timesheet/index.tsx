import AppDatePicker from "@/components/AppDatePicker";
import DateTable from "@/components/pages/timesheet/DateTable";
import { dayjs } from "@/dayjs-config";
import { useGetCheckInOutTimesheet } from "@/hooks/check-in-out";
import { Typography } from "antd";
import { Dayjs } from "dayjs";
import { useState } from "react";

const { Text } = Typography;

const TimeSheet = () => {
  const [params, setParams] = useState<Dayjs>(dayjs());
  const {
    data: timesheet = {},
    isLoading,
    isFetching,
  } = useGetCheckInOutTimesheet({
    month: params.month(),
    year: params.year(),
  }) as any;

  const changeTime = (value: any) => {
    setParams(dayjs(value));
  };

  return (
    <div className="timesheet-page">
      <div className="time">
        <Text className="app-title">{params.format("MMMM YYYY")}</Text>
        <AppDatePicker
          picker="month"
          pickerLabel="Select time to show"
          onChange={changeTime}
          allowClear={false}
        />
      </div>
      <DateTable dataSource={timesheet} loading={isFetching || isLoading} />
    </div>
  );
};

export default TimeSheet;
