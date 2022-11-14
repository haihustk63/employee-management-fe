import { atom } from "recoil";

export const currentUserAtom = atom({
  key: "current-user",
  default: {
    email: "haipham@example.com",
    name: "Harry Pham",
    delivery: "Developer",
    role: 0,
  },
});
