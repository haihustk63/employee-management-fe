import purity from "dompurify";
const purityContent = (content: string) => {
  return purity.sanitize(content);
};

const addKeyToData = (data: any[] = [], createKey?: any) => {
  return data.map((item) => ({
    key: item?.id || createKey?.(item) || Math.random().toString(),
    ...item,
  }));
};

const dataToOptions = (data: any[] = []) => {
  return data.map((item: any) => ({
    key: item.key || item.id,
    value: item.value || item.id,
    label: item.label || item.name,
  }));
};

const makeCleanObject = (obj: object = {}) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      (p: any) => ![undefined, null, ""].includes(p[1])
    )
  );
};

export { purityContent, addKeyToData, dataToOptions, makeCleanObject };
