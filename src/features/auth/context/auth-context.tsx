import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  authService,
  BaseAuthProps,
  SignupStatus,
} from "../service/auth-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTHENTICATED_USER, USER_INFO_KEY } from "../const";

export interface UserInfo {
  email: string;
  name: string;
  password: string;
}

export interface AuthState {
  formData: Record<string, unknown>;
  isAuthenticated: boolean;
  isSignupSuccess?: boolean;
  userInfo?: Partial<UserInfo>;
}

export interface AuthEvent {
  setFormData: (input: Record<string, unknown>) => void;
  handleLogin: ({ email, password }: BaseAuthProps) => Promise<
    | {
        email?: string;
        name?: string;
        token?: string;
        errorMessage?: string;
      }
    | undefined
  >;
  handleSignup: ({
    email,
    password,
    name,
  }: BaseAuthProps & { name: string }) => Promise<{
    message: string;
    status: SignupStatus;
  }>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<(AuthState & AuthEvent) | undefined>(
  undefined
);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | undefined>(
    undefined
  );
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleLogin = async ({ ...authProps }: BaseAuthProps) => {
    try {
      const response = await authService.login({
        ...authProps,
      });

      if (response && !response.errorMessage) {
        setUserInfo({ email: response?.email, name: response?.name });
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      return response;
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const handleSignup = async ({
    name,
    ...authProps
  }: BaseAuthProps & { name: string }) => {
    const response = await authService.signup({ ...authProps, name: name });
    return response;
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(AUTHENTICATED_USER);
    } catch (error) {
      await AsyncStorage.clear();
    }

    setAuthenticated(false);
    setUserInfo(undefined);
  };

  const refreshSession = async () => {
    try {
      const loginInfo = await AsyncStorage.getItem(AUTHENTICATED_USER);
      if (loginInfo) {
        const parsed: UserInfo = JSON.parse(loginInfo);
        setUserInfo({ name: parsed.name, email: parsed.email });
        return setAuthenticated(true);
      }

      return setAuthenticated(false);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const onFirstAppLaunch = async () => {
    const key = await AsyncStorage.getAllKeys();
    const matchedKey = key.find((value) => value === USER_INFO_KEY);
    if (matchedKey) return;
    await authService.initMockData();
  };

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    onFirstAppLaunch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        formData,
        setFormData: setFormData,
        userInfo: userInfo,
        isAuthenticated,
        handleLogin: handleLogin,
        handleSignup: handleSignup,
        handleLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};
