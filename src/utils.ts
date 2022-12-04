import purity from "dompurify";
const purityContent = (content: string) => {
  return purity.sanitize(content);
};

const addKeyToData = (data: any[] = []) => {
  return data.map((item) => ({
    key: item?.id || Math.random().toString(),
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

export { purityContent, addKeyToData, dataToOptions };
