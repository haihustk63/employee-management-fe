import purity from "dompurify";
const purityContent = (content) => {
  return purity.sanitize(content);
};

export { purityContent };
