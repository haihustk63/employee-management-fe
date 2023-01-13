import AppButton from "@/components/AppButton";
import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { Typography } from "antd";
import { useContext } from "react";

const ConfirmAttempt = () => {
  const { confirmAttempt } = useContext(CandidateSkillTestContext) as any;

  return (
    <div>
      <AppButton buttonTitle="Confirm Attempt" onClick={confirmAttempt} />
      <Typography.Text>
        After clicking this button, you can try this test just only one time
      </Typography.Text>
    </div>
  );
};

export default ConfirmAttempt;
