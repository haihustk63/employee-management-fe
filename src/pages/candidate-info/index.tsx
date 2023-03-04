import AppPrimaryCard from "@/components/AppCard/Primary";
import AppInfoItem from "@/components/AppInfoItem";
import { currentUserAtom } from "@/modules/currentUser";
import { getDateFormat, mergeName } from "@/utils";
import { useRecoilValue } from "recoil";

const CandidateInfo = () => {
  const { candidate } = useRecoilValue(currentUserAtom);
  const cvLink = (
    <a href={candidate?.cvLink} target="_blank">
      CV Link
    </a>
  );

  return (
    <div className="candidate-profile">
      <AppPrimaryCard title="Profile">
        <AppInfoItem label="Name" value={candidate?.name} />
        <AppInfoItem label="Email" value={candidate?.email} />
        <AppInfoItem label="Phone" value={candidate?.phone} />
        <AppInfoItem label="CV Link" value={cvLink} />
      </AppPrimaryCard>
      <AppPrimaryCard title="Interview information">
        <AppInfoItem label="Job" value={candidate?.job?.title} />
        <AppInfoItem
          label="Interviewer"
          value={mergeName(candidate?.interviewer)}
        />
        <AppInfoItem
          label="Appointment Time"
          value={getDateFormat(candidate?.appointmentTime)}
        />
      </AppPrimaryCard>
    </div>
  );
};

export default CandidateInfo;
