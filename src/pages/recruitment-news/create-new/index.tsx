import TextEditor from "@/components/AppTextEditor";

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
      <TextEditor />
    </div>
  );
};

export default CreateNewRecruitmentNews;
