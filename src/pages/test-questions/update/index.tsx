import { useLocation, useParams } from "react-router-dom";
import FormAddQuestion from "@/components/pages/test-questions/FormAddQuestion";

const UpdateTestQuestion = () => {
  const { questionId } = useParams();
  return (
    <div>
      <FormAddQuestion questionId={questionId} />
    </div>
  );
};

export default UpdateTestQuestion;
