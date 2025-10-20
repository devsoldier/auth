import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { G, Path } from "react-native-svg";

type FormFieldProps = {
  errorMessage?: string;
  visibility?: boolean;
};

export const FormField = ({
  errorMessage,
  visibility,
  ...props
}: FormFieldProps & TextInputProps) => {
  const mergeStyles = [
    formFieldStyle.input,
    props.style,
    errorMessage && formFieldStyle.errorState,
  ];
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const toggleSecureEntry = () => {
    setIsHidden((prev) => !prev);
  };

  const visibilityON = () => (
    <Svg viewBox="0 0 24 24">
      <Path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></Path>
    </Svg>
  );

  const visibilityOFF = () => (
    <Svg viewBox="0 0 24 24">
      <G stroke-linecap="round"></G>
      <G stroke-linejoin="round"></G>
      <Path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></Path>
    </Svg>
  );

  return (
    <>
      <View style={formFieldStyle.inputContainer}>
        <TextInput
          {...props}
          style={mergeStyles}
          secureTextEntry={isHidden}
        ></TextInput>
        <View
          style={{
            height: 24,
            width: 24,
            position: "absolute",
            right: 10,
          }}
        >
          {visibility && (
            <Pressable style={formFieldStyle.icon} onPress={toggleSecureEntry}>
              {isHidden ? visibilityON() : visibilityOFF()}
            </Pressable>
          )}
        </View>
      </View>
      {errorMessage && (
        <Text style={formFieldStyle.errorMessage}>{errorMessage}</Text>
      )}
    </>
  );
};

const formFieldStyle = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
  },
  errorState: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
  },
  icon: {
    // position: "absolute",
    // right: 10,
    // top: 0,
    // bottom: 0,
    // justifyContent: "center",
    // paddingHorizontal: 5,
    // backgroundColor: "yellow",
  },
  errorMessage: {
    color: "red",
  },
});
