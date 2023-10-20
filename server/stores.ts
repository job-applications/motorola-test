import { UserRecord } from "./types";

export const userStore: Record<string, UserRecord> = {
  user1: {
    id: "user1",
    createdAt: new Date("2023-10-11T11:50:40.000Z"),
  },
  admin1: {
    id: "admin1",
    createdAt: new Date("2022-10-12T14:50:40.000Z"),
    isAdministrator: true,
  },
};
