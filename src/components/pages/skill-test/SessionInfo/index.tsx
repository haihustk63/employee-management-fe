import AppCountDown from "@/components/AppCountDown";
import { currentUserAtom } from "@/modules/currentUser";
import { CandidateSkillTestContext } from "@/pages/skill-test/do-test";
import { getDateNow } from "@/utils";
import { Typography } from "antd";
import { useContext } from "react";
import { useRecoilValue } from "recoil";

const { Text, Title } = Typography;

const SessionInfo = () => {
  const user = useRecoilValue(currentUserAtom);
  const { duration, handleSetCurrentDuration } = useContext(
    CandidateSkillTestContext
  ) as any;

  return (
    <div className="skill-test-session-info">
      <Text className="name">Hello {user?.candidate?.name}</Text>
      <Text className="date">This is your skill test on {getDateNow()}</Text>
      <Text id="count-down" className="countdown">
        Time left:{" "}
        {duration > 0 && (
          <AppCountDown
            seconds={duration}
            start={true}
            callback={handleSetCurrentDuration}
          />
        )}
      </Text>
    </div>
  );
};

export default SessionInfo;
