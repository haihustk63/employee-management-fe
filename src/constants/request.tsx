import moment from "moment";

export const REQUEST_TYPES = {
  MODIFY_CHECKIN: 1,
  MODIFY_CHECKOUT: 2,
  UNPAID_LEAVE: 3,
  ANNUAL_LEAVE: 4,
  OVER_TIME: 5,
  REMOTE: 6,
};

export const REQUEST_TYPES_OPTIONS = [
  {
    key: 1,
    value: REQUEST_TYPES.MODIFY_CHECKIN,
    label: "Modify checkin",
  },
  {
    key: 2,
    value: REQUEST_TYPES.MODIFY_CHECKOUT,
    label: "Modify checkout",
  },
  {
    key: 3,
    value: REQUEST_TYPES.UNPAID_LEAVE,
    label: "Unpaid leave",
  },
  {
    key: 4,
    value: REQUEST_TYPES.ANNUAL_LEAVE,
    label: "Annual leave",
  },
  {
    key: 5,
    value: REQUEST_TYPES.OVER_TIME,
    label: "Overtime",
  },
  {
    key: 6,
    value: REQUEST_TYPES.REMOTE,
    label: "Working remote",
  },
];

export const LEAVING_TIME = {
  MORNING: "MORNING",
  AFTERNOON: "AFTERNOON",
  ALLDAY: "ALLDAY",
};

export const LEAVING_TIME_OPTIONS = [
  {
    key: 1,
    value: LEAVING_TIME.MORNING,
    label: "Morning",
  },
  {
    key: 2,
    value: LEAVING_TIME.AFTERNOON,
    label: "Afternoon",
  },
  {
    key: 3,
    value: LEAVING_TIME.ALLDAY,
    label: "All day",
  },
];

export enum REQUEST_STEP {
  CHOOSE_TYPE,
  FILL_APPLICATION,
  SHOW_RESULT,
}

export const WORKING_TIME = {
  MORNING_START: "8:00",
  MORNING_END: "12:00",
  AFTERNOON_START: "13:00",
  AFTERNOON_END: "17:00",
};

export const REQUEST_STATUS = {
  PENDING: 1,
  ACCEPTED: 2,
  REJECTED: 3,
};

export const REQUEST_STATUS_OPTIONS = {
  [REQUEST_STATUS.PENDING]: {
    key: 1,
    value: 1,
    label: "Pending",
    color: "warning",
  },
  [REQUEST_STATUS.ACCEPTED]: {
    key: 2,
    value: 2,
    color: "green",
    label: "Accepted",
  },
  [REQUEST_STATUS.REJECTED]: {
    key: 3,
    value: 3,
    color: "error",
    label: "Rejected",
  },
};
