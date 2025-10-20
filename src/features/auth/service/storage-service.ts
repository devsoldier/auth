import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATED_USER, USER_INFO_KEY } from "../const";
import { BaseAuthProps } from "./auth-service";
import { UserInfo } from "../context/auth-context";

export interface StorageService {
  storeUserInfo: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<boolean | null>;
  findUserInfo: ({
    email,
  }: {
    email: string;
  }) => Promise<UserInfo | null | undefined>;
  setAuthenticatedUser: ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
}

export const storageService: StorageService = {
  /// True : Successfully stored
  /// False : User already stored
  /// Null : Failed to store
  storeUserInfo: async ({
    email,
    password,
    name,
    token,
  }: {
    email: string;
    password: string;
    name: string;
    token?: string;
  }) => {
    try {
      const users = await AsyncStorage.getItem(USER_INFO_KEY);
      const registerUserInfo = {
        email: email,
        password: password,
        name: name,
        token: token,
      };
      if (users) {
        const parsedUsers: UserInfo[] = JSON.parse(users);
        const matchedEmail = parsedUsers.find(
          (storedUser) => storedUser.email === email
        );
        if (matchedEmail) return false;

        await AsyncStorage.setItem(
          USER_INFO_KEY,
          JSON.stringify([...parsedUsers, registerUserInfo])
        );

        return true;
      }

      await AsyncStorage.setItem(
        USER_INFO_KEY,
        JSON.stringify([
          {
            ...registerUserInfo,
            token: token,
          },
        ])
      );
      return true;
    } catch (error) {
      return null;
    }
  },
  findUserInfo: async ({ email }: { email: string }) => {
    try {
      const users = await AsyncStorage.getItem(USER_INFO_KEY);
      if (users) {
        const parsed: UserInfo[] = JSON.parse(users);
        const matchedStoredUser = parsed.find(
          (storedUser) => storedUser.email === email
        );
        return matchedStoredUser;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  setAuthenticatedUser: async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    const authenticatedUser = { email: email, password: password, name: name };
    await AsyncStorage.setItem(
      AUTHENTICATED_USER,
      JSON.stringify(authenticatedUser)
    );
  },
};
