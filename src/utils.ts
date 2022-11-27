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
    key: item.id,
    value: item.id,
    label: item.name,
  }));
};

export { purityContent, addKeyToData, dataToOptions };
