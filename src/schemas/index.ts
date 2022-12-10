import { string, object, number, array } from "yup";

export const addDeliveryValidateSchema = object({
  name: string().required("Please enter name"),
  description: string().required("Please enter description"),
});

export const addTestQuestionValidateSchema = object({
  type: string().required("Please choose type"),
  level: string().required("Please choose level"),
  topics: array().min(1, "Choose at least one topic"),
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
