import AppRate from "@/components/AppRate";
import DashboardFilter from "@/components/pages/dashboard/FIlter";
import { TIME_FILTER_TYPES } from "@/constants/common";
import {
  useGetApplicationStatistics,
  useGetEducationProgramStatistics,
  useGetTopsStatistics,
} from "@/hooks/statistics";
import { Typography } from "antd";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Text } = Typography;

const AdminDashboard = () => {
  const [params, setParams] = useState({
    timeType: TIME_FILTER_TYPES.month.value,
    year: 2023,
  });
  const { data: applicationStatistics = [] } = useGetApplicationStatistics(
    params
  ) as any;
  const { data: eProgramStatistics = [] } = useGetEducationProgramStatistics(
    params
  ) as any;
  const { data: tops } = useGetTopsStatistics() as any;

  const a = [
    {
      title: "Learn how to deploy",
      averageRate: 5,
    },
    {
      title: "How to become a good developer",
      averageRate: 4,
    },
    {
      title: "Be confident!",
      averageRate: 4,
    },
    {
      title: "Some interesting stuffs",
      averageRate: 4,
    },
    {
      title: "New technologies",
      averageRate: 3,
    },
    {
      title: "Pay attention to NextJS 13",
      averageRate: 3,
    },
    {
      title: "NodeJS and ExpressJS",
      averageRate: 3,
    },
    {
      title: "New blockchain tools",
      averageRate: 3,
    },
    {
      title: "OMG! Do not using this anymore",
      averageRate: 3,
    },
    {
      title: "Some useful javascript tips",
      averageRate: 3,
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="charts">
        <Text className="title">Application</Text>
        <DashboardFilter />
        <BarChart width={730} height={250} data={applicationStatistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="Month" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#00a029" />
        </BarChart>
        <Text className="title">Education Programs</Text>
        <DashboardFilter />
        <BarChart width={730} height={250} data={eProgramStatistics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="Month" offset={0} position="bottom" />
          </XAxis>
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#00a029" />
        </BarChart>
      </div>
      <div className="tops">
        <Text className="title">Top Education Programs</Text>
        <div className="list">
          {/* tops?.topEducationPrograms */}
          {a.map(({ id, title, averageRate }: any) => (
            <div className="item" key={title}>
              <div className="title">{title}</div>
              <AppRate value={averageRate} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
