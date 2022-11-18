import { Moment } from "moment";
export interface IEmployeeFormProps {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: Moment;
  position?: string;
  role?: string;
}
