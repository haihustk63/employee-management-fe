import AppDatePicker from "@/components/AppDatePicker";
import { AppRadioGroup } from "@/components/AppFormField";
import { TIME_FILTER_TYPES } from "@/constants/common";
import { Dayjs } from "dayjs";
import { FC } from "react";

const options = [
  { choice: "Statistics by quarter", id: TIME_FILTER_TYPES.quarter.value },
  { choice: "Statistics by month", id: TIME_FILTER_TYPES.month.value },
];

const DashboardFilter: FC<{
  onChangeYear: any;
  onChangeTimeType: any;
  timeType: number;
  year: Dayjs;
}> = ({ timeType, year, onChangeTimeType, onChangeYear }) => {
  return (
    <div className="dashboard-filter">
      <AppDatePicker
        showPickerLabel={false}
        picker="year"
        value={year}
        onChange={onChangeYear}
      />
      <AppRadioGroup
        options={options}
        value={timeType}
        onChange={onChangeTimeType}
      />
    </div>
  );
};

export default DashboardFilter;
