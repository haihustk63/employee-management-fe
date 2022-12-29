import { Dayjs } from "dayjs";
export interface IEmployeeFormProps {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: Dayjs;
  positionId?: number;
  deliveryId?: number;
  role?: string;
  joinDate?: Dayjs;
  paidLeaveCount?: number;
  workingStatus: "OFFICIAL" | "PROBATIONARY" | "TEMPORARY_LAYOFFS";
}
