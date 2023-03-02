import moment from "moment";

// export const REQUEST_TYPES = {
//   MODIFY_CHECKIN: 1,
//   MODIFY_CHECKOUT: 2,
//   UNPAID_LEAVE: 3,
//   ANNUAL_LEAVE: 4,
//   OVER_TIME: 5,
//   REMOTE: 6,
// };

export const REQUEST_TYPES = {
  MODIFY_CHECKIN: {
    value: 1,
    label: "Modify checkin",
  },
  MODIFY_CHECKOUT: {
    value: 2,
    label: "Modify checkout",
  },
  UNPAID_LEAVE: {
    value: 3,
    label: "Unpaid leave",
    timeLeaving: 3,
  },
  UNPAID_MORNING_LEAVE: {
    value: 4,
    label: "Unpaid leave",
    timeLeaving: 1,
  },
  UNPAID_AFTERNOON_LEAVE: {
    value: 5,
    label: "Unpaid leave",
    timeLeaving: 2,
  },
  ANNUAL_LEAVE: {
    value: 6,
    label: "Annual leave",
    timeLeaving: 3,
  },
  ANNUAL_MORNING_LEAVE: {
    value: 7,
    label: "Annual leave",
    timeLeaving: 1,
  },
  ANNUAL_AFTERNOON_LEAVE: {
    value: 8,
    label: "Annual leave",
    timeLeaving: 2,
  },
  OVERTIME: {
    value: 9,
    label: "Working Overtime",
  },
  REMOTE: {
    value: 10,
    label: "Working Remote",
    timeLeaving: 3,
  },
  REMOTE_MORNING: {
    value: 11,
    label: "Working Remote",
    timeLeaving: 1,
  },
  REMOTE_AFTERNOON: {
    value: 12,
    label: "Working Remote",
    timeLeaving: 2,
  },
};

export const LEAVING_TIME = {
  MORNING: {
    value: 1,
    label: "MORNING",
  },
  AFTERNOON: {
    value: 2,
    label: "AFTERNOON",
  },
  ALLDAY: {
    value: 3,
    label: "ALL DAY",
  },
};

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
  PENDING: {
    value: 1,
    label: "Pending",
    color: "warning",
  },
  ACCEPTED: {
    value: 2,
    color: "green",
    label: "Accepted",
  },
  REJECTED: {
    value: 3,
    color: "error",
    label: "Rejected",
  },
};
