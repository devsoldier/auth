import { storageService } from "./storage-service";

export interface BaseAuthProps {
  email: string;
  password: string;
}

export interface MockAuthService {
  initMockData: () => Promise<void>;
  login: ({ email, password }: BaseAuthProps) => Promise<{
    email?: string;
    name?: string;
    token?: string;
    errorMessage?: string;
  }>;
  signup: ({
    email,
    password,
    name,
  }: BaseAuthProps & { name: string }) => Promise<{
    message: string;
    status: SignupStatus;
  }>;
}

export enum SignupStatus {
  Success = "success",
  Failed = "failed",
}

const mockData = {
  email: "test1234@test.com",
  password: "test1234",
  name: "test1234",
};

export const authService: MockAuthService = {
  initMockData: async () => {
    const user = await storageService.findUserInfo({ email: mockData.email });
    if (!user) await storageService.storeUserInfo({ ...mockData });
  },
  login: async ({ email, password }: BaseAuthProps) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const user = await storageService.findUserInfo({ email: email });

    if (!user) {
      return { errorMessage: "user do not exist" };
    }

    if (user.email === email && user.password !== password) {
      return { errorMessage: "wrong password" };
    }

    if (email !== user.email) {
      return { errorMessage: "user do not exist" };
    }

    await storageService.setAuthenticatedUser({
      ...user,
    });
    return { ...user, token: "1234" };
  },
  signup: async ({ name, ...authProps }: BaseAuthProps & { name: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const isStored = await storageService.storeUserInfo({
      ...authProps,
      name: name,
    });
    if (isStored)
      return {
        message: "successfully registered",
        status: SignupStatus.Success,
      };

    if (isStored === false)
      return {
        message: "email already registered",
        status: SignupStatus.Failed,
      };

    return { message: "failed to register", status: SignupStatus.Failed };
  },
};
