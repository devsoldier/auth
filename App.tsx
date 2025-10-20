import React, { useEffect } from "react";
import { AuthContextProvider } from "./src/features/auth/context/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootNavigator } from "./src/features/route";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    MaterialIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
        <SafeAreaView>
          <StatusBar backgroundColor={"grey"}></StatusBar>
          <RootNavigator />
        </SafeAreaView>
      </AuthContextProvider>

      <Toast />
    </GestureHandlerRootView>
  );
}
