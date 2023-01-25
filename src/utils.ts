import purity from "dompurify";
import { createUniqueId } from "./helpers";
import { dayjs } from "./dayjs-config";
import {
  LEAVING_TIME,
  REQUEST_STATUS,
  REQUEST_TYPES,
} from "./constants/request";
import {
  APP_ROLES,
  COMMON_TYPE_QUESTION,
  QUESTION_LEVELS,
  SIDER_ITEMS,
  TEST_STATUS,
  WORKING_STATUS,
} from "./constants/common";
import { Dayjs } from "dayjs";

const purityContent = (content?: string) => {
  if (!content) return "";
  return purity.sanitize(content);
};

const addKeyToData = (data: any[] = [], createKey?: any) => {
  return data.map((item) => ({
    key: item?.id || createKey?.(item) || createUniqueId(),
    ...item,
  }));
};

const dataToOptions = (data: any[] = []) => {
  return data.map((item: any) => ({
    key: item.key ?? item.id,
    value: item.value ?? item.id,
    label: item.label ?? item.name ?? mergeName(item),
  }));
};

const makeCleanObject = (obj: object = {}) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      (p: any) => ![undefined, null, ""].includes(p[1])
    )
  );
};

const getTime = (date: string) => {
  if (!date) return "";
  const dateObj = new Date(date);
  return dayjs(dateObj).format("HH:mm");
};

const getDateNow = () => {
  return dayjs().format("DD/MM/YYYY");
};

const getDateFormat = (date: string) => {
  if (!date) return "";
  return dayjs(date).format("DD/MM/YYYY");
};

const mergeName = (value: any) => {
  const { firstName = "", middleName = "", lastName = "" } = value || {};
  return lastName + " " + middleName + " " + firstName;
};

export const getDaysInMonth = () => {
  return dayjs(Date.now()).daysInMonth();
};

export const getRowsTimesheet = (data: any = []) => {
  const days = getDaysInMonth();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  let rows: any[] = [];
  for (let day in [...Array(days)]) {
    const dateFormat = dayjs(
      `${currentYear}-${currentMonth}-${Number(day) + 1}`
    ).format("D dddd");
    rows = [
      ...rows,
      {
        date: dateFormat,
        checkin: "",
        checkout: "",
        workingHour: "",
        note: "",
      },
    ];
  }

  data.map((item: any) => {
    const { day, ...rest } = item;
    const indexRow = day - 1;
    rows[indexRow] = {
      ...rows[indexRow],
      ...rest,
    };
  });

  return rows;
};

const getRequestTypeValues = (requestTypes: any[]) => {
  return requestTypes.map((type: any) => type.value);
};

const getRequestTypeLabel = (type: any) => {
  return Object.values(REQUEST_TYPES).find(
    (requestType: any) => requestType.value === type
  )?.label;
};

const unknowedTime = "X";

const getDuration = (request: any) => {
  let time;
  const duration = request.duration;
  if (duration) {
    const splittedDurations = duration.split("-");
    time = splittedDurations.includes(unknowedTime)
      ? getHalfTime(splittedDurations)
      : duration;
  } else {
    const timeLeaving = Object.values(REQUEST_TYPES).find(
      (requestType) => requestType.value === request.type
    ) as any;
    time = getTimeLeavingLabel(timeLeaving.timeLeaving);
  }

  return time;
};

const getHalfTime = (time: any[]) => {
  const [timeValue] = time.filter((timeVal) => timeVal !== unknowedTime);
  return timeValue;
};

const getTimeLeavingLabel = (timeLeaving: any) => {
  return Object.values(LEAVING_TIME).find(
    (leavingTime) => leavingTime.value === timeLeaving
  )?.label;
};

const getRequestRows = (requests: any[]) => {
  return requests.map((request) => {
    const duration = getDuration(request);

    return { ...request, duration };
  });
};

const createRequestOptions = () => {
  return Object.values(REQUEST_TYPES).map((type: any) => {
    let typeLabel = type.label;
    const { timeLeaving = "" } = type;
    if (timeLeaving) {
      typeLabel += " " + getTimeLeavingLabel(timeLeaving)?.toLocaleLowerCase();
    }
    return {
      ...type,
      label: typeLabel,
    };
  });
};

const getRequestStatus = (status: any) => {
  return Object.values(REQUEST_STATUS).find(
    (requestStatus: any) => requestStatus.value === status
  );
};

const getRoleLabel = (role: any) => {
  return Object.values(APP_ROLES).find((roleObj) => roleObj.value === role)
    ?.label;
};

const getWorkingStatusLabel = (status: any) => {
  return Object.values(WORKING_STATUS).find(
    (statusObj) => statusObj.value === status
  )?.label;
};

const getSiderByRoles = (role: number) => {
  const siderItems = SIDER_ITEMS.map(({ roles = [], ...rest }) => {
    if (roles?.length) {
      return roles.includes(role) ? { ...rest } : undefined;
    }
    let permittedChildren = rest.children?.map(
      ({ roles = [], ...restChildren }: any) => {
        if (roles.includes(role)) {
          return restChildren;
        }
      }
    );
    permittedChildren = cleanArray(permittedChildren || []);
    if (permittedChildren.length > 1) {
      return {
        ...rest,
        children: permittedChildren,
      };
    }
    return permittedChildren[0];
  });
  return cleanArray(siderItems);
};

const cleanArray = (arr: any[]) => {
  return arr.filter(
    (item) => item !== undefined && item !== null && item !== ""
  );
};

const getQuestionType = (type: number) => {
  return Object.values(COMMON_TYPE_QUESTION).find(
    (typeObj) => typeObj.value === type
  );
};

const getQuestionLevel = (level: number) => {
  return Object.values(QUESTION_LEVELS).find(
    (levelObj) => levelObj.value === level
  );
};

const getSkillTestStatusLabel = (value: number) => {
  return Object.values(TEST_STATUS).find((item) => item.value === value)?.label;
};

const disabledDateBeforeToday = (current: Dayjs) => {
  return current && current < dayjs().startOf("day");
};

export {
  purityContent,
  addKeyToData,
  dataToOptions,
  makeCleanObject,
  getTime,
  getDateNow,
  mergeName,
  getDateFormat,
  getRequestRows,
  getRequestTypeLabel,
  createRequestOptions,
  getRequestStatus,
  getRequestTypeValues,
  getRoleLabel,
  getWorkingStatusLabel,
  getSiderByRoles,
  getQuestionLevel,
  getQuestionType,
  getSkillTestStatusLabel,
  disabledDateBeforeToday,
};
