import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const login = async (username: string) => {
    const data: any = await $fetch("/login", {
      method: "POST",
      body: {
        username,
      },
    });

    setUser(data.user);

    return authUser;
  };

  const logout = async () => {
    setUser(null);
  };

  return {
    login,
    logout,
  };
};
