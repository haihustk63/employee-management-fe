import HiringFlow from "@/components/pages/apply-process/HiringFlow";
import { useGetTestStatus } from "@/hooks/tests";
import { currentUserAtom } from "@/modules/currentUser";
import { useRecoilValue } from "recoil";

const ApplyProcess = () => {
  const { candidate } = useRecoilValue(currentUserAtom);
  const { data } = useGetTestStatus(candidate?.skillTest?.id) as any;
  const { questionCount = 0, essayCount = 0 } = data || {};

  return (
    <div className="apply-process">
      <p>
        Your result:{" "}
        <strong>
          {questionCount - essayCount}/{questionCount}
        </strong>{" "}
        and {essayCount} constructed-response questions waiting for review
      </p>
      <p>We've send email to {candidate.email} </p>
      <HiringFlow />
    </div>
  );
};

export default ApplyProcess;
