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

export const REQUEST_TYPE_GROUP = {
  LEAVE: "leave",
  CHECK_IN_OUT: "check_in_out",
  LATE_EARLY: "late_early",
  REMOTE: "remote",
  OVERTIME: "overtime",
};

export const REQUEST_LIST = [
  {
    title: REQUEST_TYPES.UNPAID_LEAVE,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.LEAVE,
  },
  {
    title: REQUEST_TYPES.ANNUAL_LEAVE,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.LEAVE,
  },
  {
    title: REQUEST_TYPES.FORGET_CHECK_IN,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.CHECK_IN_OUT,
  },
  {
    title: REQUEST_TYPES.FORGET_CHECK_OUT,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.CHECK_IN_OUT,
  },
  {
    title: REQUEST_TYPES.LEAVING_EARLY,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.LATE_EARLY,
  },
  {
    title: REQUEST_TYPES.BEING_LATE,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.LATE_EARLY,
  },
  {
    title: REQUEST_TYPES.REMOTE_WORK,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.REMOTE,
  },
  {
    title: REQUEST_TYPES.OVERTIME,
    description: "Something description",
    typeGroup: REQUEST_TYPE_GROUP.OVERTIME,
  },
];

export enum REQUEST_STEP {
  CHOOSE_TYPE,
  FILL_APPLICATION,
  SHOW_RESULT,
}
