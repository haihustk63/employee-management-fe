import { format } from "date-fns";
import purity from "dompurify";
import { createUniqueId } from "./helpers";
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
    label: item.label ?? item.name,
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
  return format(dateObj, "HH:mm");
};

const getDateNow = () => {
  return format(new Date(), "dd/MM/yyyy");
};

const mergeName = (value: any) => {
  const { firstName = "", middleName = "", lastName = "" } = value || {};
  return lastName + " " + middleName + " " + firstName;
};

export {
  purityContent,
  addKeyToData,
  dataToOptions,
  makeCleanObject,
  getTime,
  getDateNow,
  mergeName,
};
