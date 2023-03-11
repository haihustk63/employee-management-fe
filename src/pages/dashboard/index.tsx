import AppRate from "@/components/AppRate";
import DashboardFilter from "@/components/pages/dashboard/FIlter";
import { TIME_FILTER_TYPES } from "@/constants/common";
import {
  useGetApplicationStatistics,
  useGetEducationProgramStatistics,
  useGetTopsStatistics,
} from "@/hooks/statistics";
import { Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dayjs } from "@/dayjs-config";
import { Dayjs } from "dayjs";

const { Text } = Typography;

const AdminDashboard = () => {
  const [timeType, setTimeType] = useState(TIME_FILTER_TYPES.month.value);
  const [year, setYear] = useState(dayjs());

  const { data: applicationStatistics = [] } = useGetApplicationStatistics({
    timeType,
    year: year.year(),
  }) as any;
  const { data: eProgramStatistics = [] } = useGetEducationProgramStatistics({
    timeType,
    year: year.year(),
  }) as any;
  const { data: tops } = useGetTopsStatistics() as any;

  const onChangeYear = (e: Dayjs) => {
    setYear(e ? e : dayjs());
  };

  const onChangeTimeType = (e: any) => {
    setTimeType(e.target.value);
  };

  const labelX = useMemo(
    () => (timeType === TIME_FILTER_TYPES.month.value ? "Month" : "Quarter"),
    [timeType]
  );

  const dataKey = useMemo(
    () => (timeType === TIME_FILTER_TYPES.month.value ? "month" : "quarter"),
    [timeType]
  );

  return (
    <div className="admin-dashboard">
      <div className="charts">
        <DashboardFilter
          year={year}
          timeType={timeType}
          onChangeTimeType={onChangeTimeType}
          onChangeYear={onChangeYear}
        />
        <Text className="title">Application</Text>
        <BarChart width={730} height={250} data={applicationStatistics}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey={dataKey}>
            <Label value={labelX} offset={0} position="bottom" />
          </XAxis>
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Bar dataKey="count" fill="#00a029" />
        </BarChart>
        <Text className="title">Education Programs</Text>
        <BarChart width={730} height={250} data={eProgramStatistics}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey={dataKey}>
            <Label value={labelX} offset={0} position="bottom" />
          </XAxis>
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Bar dataKey="count" fill="#00a029" />
        </BarChart>
      </div>
      <div className="tops">
        <Text className="title">Top Education Programs</Text>
        <div className="list">
          {/* tops?.topEducationPrograms */}
          {tops?.topEducationPrograms?.map(
            ({ id, title, averageRate }: any) => (
              <div className="item" key={title}>
                <div className="title">{title}</div>
                <AppRate value={averageRate} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
