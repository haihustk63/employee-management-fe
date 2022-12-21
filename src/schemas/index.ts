import { string, object, number, array, date } from "yup";

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
  middleName: string().required("Middle name is required"),
  lastName: string().required("Last name is required"),
  phoneNumber: string().required("Phone number is required"),
  dateOfBirth: date().required("Date of birth is required"),
  positionId: number().required("Position id is required"),
  deliveryId: number().required("Delivery id is required"),
  workingStatus: string()
    .oneOf(["OFFICIAL", "PROBATIONARY", "TEMPORARY_LAYOFFS"])
    .required("Working status is required"),
  role: number().required("Role is required").oneOf([0, 1]),
  joinDate: date().required("Join date is required"),
  paidLeaveCount: number().required("Leave count is required"),
});
