import { Moment } from "moment";

export interface iFormCheckInOutProps {
  initialValues: {
    checkInOutType: string;
    date: Moment;
    note: string;
  };
}
