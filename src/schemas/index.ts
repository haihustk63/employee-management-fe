import { string, object, number, date } from "yup";

export const addDeliveryValidateSchema = object({
  name: string().required("Please enter name"),
  description: string().required("Please enter description"),
});

export const addTestQuestionValidateSchema = object({
  type: string().required("Please choose type"),
  level: string().required("Please choose level"),
  topic: string().required("Please choose topic"),
  questionText: string().required("Please enter question"),
});

export const loginAsCandidate = object({
  username: string().required("Username is required"),
  password: string().required(),
});

export const loginAsEmployee = object({
  email: string()
    .required("Email is required")
    .email("Please input a valid email"),
  password: string().required(),
});

export const createTestSchema = object({
  topicId: number().required("Type is required"),
  level: string().required("Level is required"),
  amount: number().min(1, "Minimum is 1").required("Amount is required"),
});

export const createCandidateAccountSchema = object({
  username: string().required("Username is required"),
  password: string()
    .min(6, "Password contains at least 6 characters")
    .required("Password is required"),
  candidateId: number().required(
    "You have to assign this account to a candidate"
  ),
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
  workingStatus: string()
    .oneOf(["OFFICIAL", "PROBATIONARY", "TEMPORARY_LAYOFFS"])
    .required("Working status is required"),
  role: number().required("Role is required").oneOf([0, 1]),
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
