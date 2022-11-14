import CheckInOutList from "@/components/pages/home/CheckInOutList";
import CheckInOut from "@/components/pages/home/CheckInOut";
import { Typography } from "antd";

const { Title } = Typography;

const Home = () => {
  return (
    <div className="home-page">
      <CheckInOut />
      <CheckInOutList />
    </div>
  );
};

export default Home;
