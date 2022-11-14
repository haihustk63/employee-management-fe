import { atom } from "recoil";

export const breadCrumbAtom = atom({
  key: "bread-crum",
  default: ["Home"],
});
