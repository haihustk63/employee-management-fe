import { string, object, number, date } from "yup";

export const addDeliveryValidateSchema = object({
  name: string().required("Please enter name"),
  description: string().required("Please enter description"),
});

export const addTestQuestionValidateSchema = object({
  type: string().required("Please choose type"),
  level: string().required("Please choose level"),
  topicId: string().required("Please choose topic"),
  questionText: string().required("Please enter question"),
});

export const loginSchema = object({
  email: string()
    .required("Email is required")
    .email("Please input a valid email"),
  password: string().required("Password is required"),
});

export const createTestSchema = object({
  topicId: number().required("Type is required"),
  level: string().required("Level is required"),
  amount: number().min(1, "Minimum is 1").required("Amount is required"),
});

export const createAccountSchema = object({
  email: string().required("Email is required").email("Email is invalid"),
  password: string()
    .min(6, "Password contains at least 6 characters")
    .required("Password is required"),
});

export const updateAccountSchema = object({
  email: string().required("Email is required").email("Email is invalid"),
  employeeId: number().required("Employee is required"),
});

export const createEmployeeProfileSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  phoneNumber: string()
    .required("Phone number is required")
    .test("validPhone", "Invalid phone number", function (value: any) {
      // const { path, createError } = this;
      return !/[^0-9]+/g.test(value);
      // return createError({ path, message: "Invalid phone number" });
    })
    .min(10, "Phone number must be at least 10 characters")
    .max(11, "Phone number must be at most 11 characters"),

  dateOfBirth: date().required("Date of birth is required"),
  positionId: number().required("Position is required"),
  deliveryId: number().required("Delivery is required"),
  workingStatus: number().required("Working status is required"),
  role: number().required("Role is required"),
  joinDate: date().required("Join date is required"),
  paidLeaveCount: number()
    .typeError("Leave count must be a number")
    .integer("Leave count must be an integer")
    .min(0, "Leave count is at least 0")
    .max(12, "Leave count is at most 12")
    .required("Leave count is required"),
});

export const createJobSchema = object({
  title: string().required("Title is required"),
  typeOfJob: number().required("Job tyle  is required").oneOf([0, 1]),
  upTo: number().required("Upto is required"),
  level: number().required("Job level is required").oneOf([0, 1, 2, 3, 4]),
  jobDetail: string().required("Job detail is required"),
  positionId: number().required("Position is required"),
});

export const createEducationProgramSchema = object({
  title: string().required("Title is required"),
  content: string().required("Content is required"),
});

export const addCommonRequestSchema = object({
  type: number().required("Type is required"),
  date: date().typeError("Invalid date").required("Date is required"),
});

export const addOvertimeRequestSchema = object({
  type: number().required("Type is required"),
  date: date().typeError("Invalid date").required("Date is required"),
  startTime: date()
    .typeError("Invalid date")
    .required("Start time is required"),
  endTime: date().typeError("Invalid date").required("End time is required"),
});

export const addCheckInRequestSchema = object({
  type: number().required("Type is required"),
  date: date().typeError("Invalid date").required("Date is required"),
  startTime: date()
    .typeError("Invalid date")
    .required("Start time is required"),
});

export const addCheckOutRequestSchema = object({
  type: number().required("Type is required"),
  date: date().typeError("Invalid date").required("Date is required"),
  endTime: date().typeError("Invalid date").required("End time is required"),
});
