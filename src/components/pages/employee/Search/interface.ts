import { Moment } from "moment";

export interface ISearchEmployeeProps {
  //name, email, phone number
  keyword?: string;
  position?: string;
  delivery?: string;
  workingStatus?: string;
  role?: string;
  joinDate?: Moment;
  //location
}
