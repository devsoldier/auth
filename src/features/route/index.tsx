import { useAuthContext } from "../auth/context/auth-context";
import { Keyboard, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthStack } from "./auth/index";
import { AppStack } from "./app/index";
import { RootStack } from "./root-stack";

export const RootNavigator = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <NavigationContainer>
      <View
        style={{ height: "100%", width: "100%" }}
        onTouchStart={Keyboard.dismiss}
      >
        <>
          <RootStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isAuthenticated ? "Home" : "Login"}
          >
            {isAuthenticated ? AppStack() : AuthStack()}
          </RootStack.Navigator>
        </>
      </View>
    </NavigationContainer>
  );
};
export { RootStack };
