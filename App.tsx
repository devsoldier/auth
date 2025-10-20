import React from "react";
import { AuthContextProvider } from "./src/features/auth/context/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "./src/features/route";
import { LoginPage } from "./src/features/auth/component/login";
import { SignupPage } from "./src/features/auth/component/signup";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <SafeAreaView>
          <StatusBar backgroundColor={"grey"}></StatusBar>
          <RootNavigator />
        </SafeAreaView>
      </AuthContextProvider>
      {/* <SignupPage></SignupPage> */}

      <Toast />
    </GestureHandlerRootView>
  );
}
