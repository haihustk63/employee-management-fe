import { Moment } from "moment";
export interface IEmployeeFormProps {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: Moment;
  positionId?: number;
  deliveryId?: number;
  role?: string;
  joinDate?: Moment;
  paidLeaveCount?: number;
  workingStatus: "OFFICIAL" | "PROBATIONARY" | "TEMPORARY_LAYOFFS";
}
