import { atom } from "recoil";
import persistAtom from "./persist";

export const currentUserAtom = atom({
  key: "current-user",
  default: {},
  effects_UNSTABLE: [persistAtom],
});