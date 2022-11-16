import moment from "moment";

export const REQUEST_TYPES = {
  UNPAID_LEAVE: "Unpaid Leave",
  ANNUAL_LEAVE: "Annual Leave",
  FORGET_CHECK_IN: "Forget to check in",
  FORGET_CHECK_OUT: "Forget to check out",
  LEAVING_EARLY: "Leaving Early",
  BEING_LATE: "Being Late",
  REMOTE_WORK: "Remote Work",
  OVERTIME: "Overtime",
};

export const REQUEST_LIST = [
  {
    type: REQUEST_TYPES.UNPAID_LEAVE,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.ANNUAL_LEAVE,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.FORGET_CHECK_IN,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.FORGET_CHECK_OUT,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.LEAVING_EARLY,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.BEING_LATE,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.REMOTE_WORK,
    description: "Something description",
  },
  {
    type: REQUEST_TYPES.OVERTIME,
    description: "Something description",
  },
];

export enum REQUEST_STEP {
  CHOOSE_TYPE,
  FILL_APPLICATION,
  SHOW_RESULT,
}

export const LEAVING_TIME_OPTIONS = [
  {
    key: "morning",
    value: "morning",
    label: "Morning",
  },
  {
    key: "afternoon",
    value: "afternoon",
    label: "Afternoon",
  },
  {
    key: "all_day",
    value: "all_day",
    label: "All day",
  },
];

export const LEAVING_TYPE_OPTIONS = [
  {
    key: "annual",
    value: "annual",
    label: "Annual Leave",
  },
  {
    key: "unpaid",
    value: "unpaid",
    label: "Unpaid Leave",
  },
];

export const CHECK_IN_OUT_OPTIONS = [
  {
    key: "checkin",
    value: "checkin",
    label: "Check In",
  },
  {
    key: "checkout",
    value: "checkout",
    label: "Checkout",
  },
];

export const LATE_EARLY_OT_OPTIONS = [
  {
    key: "being_late",
    value: "being_late",
    label: "Being Late",
  },
  {
    key: "leaving_early",
    value: "leaving_early",
    label: "Leaving Early",
  },
  {
    key: "overtime",
    value: "overtime",
    label: "Overtime",
  },
];

export const WORKING_REMOTE_TIME_OPTIONS = [
  {
    key: "morning",
    value: "morning",
    label: "Morning",
  },
  {
    key: "afternoon",
    value: "afternoon",
    label: "Afternoon",
  },
  {
    key: "all_day",
    value: "all_day",
    label: "All day",
  },
];

export const INITIAL_VALUES_FORM = {
  initialValuesAnnualLeave: {
    leavingTime: "all_day",
    leavingType: "annual",
    reason: "",
    date: moment(Date.now()),
  },

  initialValuesUnpaidLeave: {
    leavingTime: "all_day",
    leavingType: "unpaid",
    reason: "",
    date: moment(Date.now()),
  },

  initialValuesCheckIn: {
    checkInOutType: "checkin",
    date: moment(Date.now()),
    note: "",
  },

  initialValuesCheckOut: {
    checkInOutType: "checkout",
    date: moment(Date.now()),
    note: "",
  },

  initialValuesBeingLate: {
    type: "being_late",
    date: moment(Date.now()),
    duration: 0,
  },

  initialValuesLeavingEarly: {
    type: "leaving_early",
    date: moment(Date.now()),
    duration: 0,
  },

  initialValuesOvertime: {
    type: "overtime",
    date: moment(Date.now()),
    duration: 0,
  },

  initialValuesWorkingRemote: {
    workingTime: "all_day",
    date: moment(Date.now()),
  },
};
