import AppButton from "@/components/AppButton";
import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { Typography } from "antd";
import { useContext } from "react";

const { Text } = Typography;

const ConfirmAttempt = () => {
  const { confirmAttempt } = useContext(CandidateSkillTestContext) as any;

  return (
    <div className="confirm-attempt">
      <AppButton buttonTitle="Confirm Attempt" onClick={confirmAttempt} />
      <Text className="text">
        After clicking this button, you can try this test just only one time!
      </Text>
    </div>
  );
};

export default ConfirmAttempt;
