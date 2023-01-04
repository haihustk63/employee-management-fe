import { Dayjs } from "dayjs";

export interface ISearchEmployeeProps {
  //name, email, phone number
  keyword?: string;
  position?: string;
  delivery?: string;
  workingStatus?: string;
  role?: string;
  joinDate?: Dayjs;
  //location
}
