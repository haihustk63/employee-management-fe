import { Step } from "intro.js-react";

export interface IAppTourProps {
  enabled?: boolean;
  initialStep: number;
  steps: Step[];
  onExit: any;
  onBeforeExit?: any;
  onChange?: any;
  onBeforeChange?: any;
  onAfterChange?: any;
  onPreventChange?: any;
  onComplete?: any;
  options?: object;
}
