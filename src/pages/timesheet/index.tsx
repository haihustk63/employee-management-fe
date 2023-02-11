import DateTable from "@/components/pages/timesheet/DateTable";
import { useGetCheckInOutTimesheet } from "@/hooks/check-in-out";

const TimeSheet = () => {
  const { data = {}, isLoading, isFetching } = useGetCheckInOutTimesheet();

  return (
    <div className="timesheet">
      <DateTable dataSource={data} loading={isFetching || isLoading} />
    </div>
  );
};

export default TimeSheet;
