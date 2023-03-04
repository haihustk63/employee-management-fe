import CheckInOut from "@/components/pages/home/CheckInOut";
import CheckInOutList from "@/components/pages/home/CheckInOutList";
import { useGetCheckInOutList } from "@/hooks/check-in-out";
import { Typography } from "antd";

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
