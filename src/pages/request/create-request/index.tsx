import { useMemo, useState, createContext } from "react";
import {
  CheckCircleOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

import RequestList from "@/components/pages/request/RequestList";
import {
  REQUEST_STEP,
  REQUEST_TYPES,
  INITIAL_VALUES_FORM,
} from "@/constants/request";
import AppStep from "@/components/AppStep";
import FormLeave from "@/components/pages/request/FormLeave";
import FormCheckInOut from "@/components/pages/request/FormCheckInOut";
import FormLateEarlyOT from "@/components/pages/request/FormLateEarlyOT";
import FormWorkingRemote from "@/components/pages/request/FormWorkingRemote";
import ShowResult from "@/components/pages/request/ShowResult";

const { CHOOSE_TYPE, FILL_APPLICATION, SHOW_RESULT } = REQUEST_STEP;
const {
  ANNUAL_LEAVE,
  UNPAID_LEAVE,
  BEING_LATE,
  LEAVING_EARLY,
  OVERTIME,
  FORGET_CHECK_IN,
  FORGET_CHECK_OUT,
  REMOTE_WORK,
} = REQUEST_TYPES;

const {
  initialValuesAnnualLeave,
  initialValuesUnpaidLeave,
  initialValuesCheckIn,
  initialValuesCheckOut,
  initialValuesBeingLate,
  initialValuesLeavingEarly,
  initialValuesOvertime,
  initialValuesWorkingRemote,
} = INITIAL_VALUES_FORM;

export const RequestContext = createContext({});

const CreateRequest = () => {
  const [step, setStep] = useState(CHOOSE_TYPE);
  const [type, setType] = useState("");

  const isChoosingType = step === CHOOSE_TYPE;
  const isFillingApplication = step === FILL_APPLICATION;
  const isShowingResult = step === SHOW_RESULT;

  const handleToFillForm = () => {
    setStep(FILL_APPLICATION);
  };

  const handleToShowResult = () => {
    setStep(SHOW_RESULT);
  };

  const renderForm = useMemo(() => {
    let renderComponent;
    switch (type) {
      case ANNUAL_LEAVE:
        renderComponent = (
          <FormLeave initialValues={initialValuesAnnualLeave} />
        );
        break;
      case UNPAID_LEAVE:
        renderComponent = (
          <FormLeave initialValues={initialValuesUnpaidLeave} />
        );
        break;
      case FORGET_CHECK_IN:
        renderComponent = (
          <FormCheckInOut initialValues={initialValuesCheckIn} />
        );
        break;
      case FORGET_CHECK_OUT:
        renderComponent = (
          <FormCheckInOut initialValues={initialValuesCheckOut} />
        );
        break;
      case BEING_LATE:
        renderComponent = (
          <FormLateEarlyOT initialValues={initialValuesBeingLate} />
        );
        break;
      case LEAVING_EARLY:
        renderComponent = (
          <FormLateEarlyOT initialValues={initialValuesLeavingEarly} />
        );
        break;
      case OVERTIME:
        renderComponent = (
          <FormLateEarlyOT initialValues={initialValuesOvertime} />
        );
        break;
      case REMOTE_WORK:
        renderComponent = (
          <FormWorkingRemote initialValues={initialValuesWorkingRemote} />
        );
        break;
      default:
        renderComponent = null;
    }
    if (renderComponent) {
      handleToFillForm();
    }
    return renderComponent;
  }, [type]);

  return (
    <RequestContext.Provider value={{ handleToShowResult }}>
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
        {isChoosingType && <RequestList setType={setType} />}
        {isFillingApplication && renderForm}
        {isShowingResult && <ShowResult />}
      </div>
    </RequestContext.Provider>
  );
};

export default CreateRequest;
