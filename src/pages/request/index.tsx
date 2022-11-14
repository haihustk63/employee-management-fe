import { useState } from "react";
import {
  CheckCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

import RequestList from "@/components/pages/request/RequestList";
import { REQUEST_STEP } from "@/constants/request";
import AppStep from "@/components/AppStep";

const { CHOOSE_TYPE, FILL_APPLICATION, SHOW_RESULT } = REQUEST_STEP;

const Request = () => {
  const [step, setStep] = useState(CHOOSE_TYPE);

  const isChoosingType = step === CHOOSE_TYPE;
  const isFillingApplication = step === FILL_APPLICATION;
  const isShowingResult = step === SHOW_RESULT;

  const handleToFillApplication = () => {
    setStep(FILL_APPLICATION);
  };

  return (
    <div className="request-page">
      <AppStep
        step={step}
        items={[
          {
            title: "Choose Type",
            icon: <UserOutlined />,
          },
          {
            title: "Fill Application",
            icon: <SolutionOutlined />,
          },
          {
            title: "Result",
            icon: <CheckCircleOutlined />,
          },
        ]}
      />
      {isChoosingType && <RequestList next={handleToFillApplication} />}
      {isFillingApplication && <p>Filling</p>}
      {isShowingResult && <p>Showing</p>}
    </div>
  );
};

export default Request;
