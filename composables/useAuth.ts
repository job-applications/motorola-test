import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const register = async (username: string) => {
    const result = await $fetch("/auth/register", {
      method: "POST",
      body: {
        username,
      },
    });

    if (result.statusCode !== 200) {
      throw new Error(result.message);
    }

    setUser(result.data);
    return authUser;
  };

  const login = async (username: string) => {
    const result = await $fetch("/auth/login", {
      method: "POST",
      body: {
        username,
      },
    });

    if (result.statusCode !== 200) {
      throw new Error(result.message);
    }

    setUser(result.data);
    return authUser;
  };

  const me = async () => {
    const result = await $fetch("/auth/me");

    if (result.statusCode !== 200) {
      throw new Error(result.message);
    }

    setUser(result.data);
    return authUser;
  };

  const logout = async () => {
    setUser(null);
  };

  return {
    me,
    login,
    logout,
    register,
  };
};
