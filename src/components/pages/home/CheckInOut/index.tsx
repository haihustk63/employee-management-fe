import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Typography } from "antd";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import DateTime from "@/components/DateTime";
import { currentUserAtom } from "@/modules/currentUser";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

const { Title } = Typography;

const CheckInOut = () => {
  const navigate = useNavigate();

  const currentUser = useRecoilValue(currentUserAtom);
  const { name } = currentUser;

  const handleNavigateRequest = () => {
    navigate(APP_PAGE_NAME_ROUTES.REQUEST);
  };

  return (
    <div className="home-check-in-out">
      <div className="user">
        <Title level={2}>Hello {name}</Title>
        <DateTime />
      </div>
      <div className="cards">
        <AppPrimaryCard title="Check in:" hasBoxShadow backgroundColor="info">
          <Title>8:00 AM</Title>
        </AppPrimaryCard>
        <AppPrimaryCard title="Check out:" hasBoxShadow backgroundColor="info">
          <Title>17:00 PM</Title>
        </AppPrimaryCard>
      </div>
      <div className="function">
        <AppButton
          buttonTitle="Add new request"
          onClick={handleNavigateRequest}
        />
      </div>
    </div>
  );
};

export default CheckInOut;
