import { Moment } from "moment";

export interface IFormWorkingRemoteProps {
  initialValues: {
    date?: Moment;
    workingTime?: string;
  };
}
