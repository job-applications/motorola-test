import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const register = async (username: string) => {
    const data = await $fetch("/api/register", {
      method: "POST",
      body: {
        username,
      },
    });

    setUser(data);

    return authUser;
  };

  const login = async (username: string) => {
    const data = await $fetch("/api/login", {
      method: "POST",
      body: {
        username,
      },
    });

    setUser(data);

    return authUser;
  };

  const logout = async () => {
    setUser(null);
  };

  return {
    login,
    logout,
    register,
  };
};
