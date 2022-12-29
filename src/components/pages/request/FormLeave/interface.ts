import { Dayjs } from "dayjs";

export interface IFormLeaveProps {
  date: Dayjs;
  reason?: string;
  type: number | undefined;
  leavingTime?: number;
  startTime?: Dayjs | undefined;
  endTime?: Dayjs | undefined;
}
