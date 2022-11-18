import TextEditor from "@/components/AppTextEditor";
import { useState } from "react";
import purify from "dompurify";

/*
const [content, setContent] = useState("");
  const handleSetContent = (newContent: string) => () => {
    setContent(newContent);
  }; 
  <div dangerouslySetInnerHTML={{ __html: purify.sanitize(content) }}></div>
*/
const CreateNewRecruitmentNews = () => {
  return (
    <div>
      <TextEditor
        onClickSave={() => {}}
      />
    </div>
  );
};

export default CreateNewRecruitmentNews;
