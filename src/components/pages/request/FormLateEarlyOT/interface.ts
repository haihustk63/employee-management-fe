import { Moment } from "moment";

export interface IFormLateEarlyOTProps {
  initialValues: {
    date?: Moment;
    duration?: number;
    type?: string;
  };
}
