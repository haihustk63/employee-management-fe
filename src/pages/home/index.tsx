import CheckInOutList from "@/components/pages/home/CheckInOutList";
import CheckInOut from "@/components/pages/home/CheckInOut";
import { Typography } from "antd";
import { useGetCheckInOutList } from "@/hooks/check-in-out";

const { Title } = Typography;

const Home = () => {
  const { data = [], isLoading, isFetching } = useGetCheckInOutList() as any;
  return (
    <div className="home-page">
      <CheckInOut />
      <CheckInOutList dataSource={data} loading={isFetching || isLoading} />
    </div>
  );
};

export default Home;
