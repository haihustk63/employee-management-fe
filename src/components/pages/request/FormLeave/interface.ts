import { Moment } from "moment";

export interface IFormLeaveProps {
  initialValues: {
    leavingTime: string;
    leavingType: string;
    reason: string;
    date?: Moment;
  };
}
