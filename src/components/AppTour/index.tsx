import { Steps } from "intro.js-react";
import { FC } from "react";
import { IAppTourProps } from "./interface";

const AppTour: FC<IAppTourProps> = ({
  enabled,
  steps,
  initialStep = 0,
  onExit,
  onComplete,
  ...props
}) => {
  return (
    <div className="app-tour">
      <Steps
        enabled={enabled}
        steps={steps}
        onComplete={onComplete}
        onExit={onExit}
        initialStep={initialStep}
      />
    </div>
  );
};

export default AppTour;
