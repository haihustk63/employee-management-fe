import AppButton from "@/components/AppButton";
import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { Typography } from "antd";
import { useContext } from "react";

const { Text } = Typography;

const ConfirmAttempt = () => {
  const { confirmAttempt } = useContext(CandidateSkillTestContext) as any;

  return (
    <div className="confirm-attempt">
      <Text className="text">
        After clicking below button, you can try this test just only one time!
      </Text>
      <ul className="notes">
        <li>Do not logout!</li>
        <li>Avoid to reload window</li>
        <li>
          You should send your answers before time's up or we will handle it
          automatically
        </li>
      </ul>
      <Text className="text">Good luck!</Text>
      <AppButton buttonTitle="Confirm Attempt" onClick={confirmAttempt} />
    </div>
  );
};

export default ConfirmAttempt;
