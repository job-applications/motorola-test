import { userStore } from "../stores";

// For simplicity we are going to assume username = user id
// .. but we probably wouldn't want this in a production environment

export const findUser = (username: string) => {
  const id = username.toLowerCase();
  return userStore[id] ?? null;
}

export const createUser = (username: string) => {
  const id = username.toLowerCase();

  const user = {
    id,
    createdAt: new Date(),
    username,
  };

  userStore[id] = user;

  return user;
};
