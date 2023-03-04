import AppDatePicker from "@/components/AppDatePicker";
import { AppSelect } from "@/components/AppFormField";
import { dayjs } from "@/dayjs-config";

const quarterOptions = [
  {
    label: "Quarter 1",
    value: 1,
  },
  {
    label: "Quarter 2",
    value: 2,
  },
  {
    label: "Quarter 3",
    value: 3,
  },
  {
    label: "Quarter 4",
    value: 4,
  },
];

const DashboardFilter = () => {
  return (
    <div className="dashboard-filter">
      <AppDatePicker showPickerLabel={false} picker="year" value={dayjs()} />
      <AppSelect options={quarterOptions} value={1} />
    </div>
  );
};

export default DashboardFilter;
