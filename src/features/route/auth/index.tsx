import { View } from "react-native";
import { LoginPage } from "../../auth/component/login/index";
import { SignupPage } from "../../auth/component/signup/index";
import { RootStack } from "../root-stack";
import { useHeaderHeight } from "@react-navigation/elements";

export const AuthStack = () => {
  return (
    <RootStack.Group>
      <RootStack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginPage}
      />
      <RootStack.Screen
        name="Signup"
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
        }}
        component={SignupPage}
      />
    </RootStack.Group>
  );
};
