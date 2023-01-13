import { atom } from "recoil";
import persistAtom from "./persist";

export const candidateTestDurationAtom = atom({
  key: "candidate-test-duration",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
