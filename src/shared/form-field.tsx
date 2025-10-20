import { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
} from "react-native";
import { Pressable } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
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
            zIndex: 1,
          }}
        >
          {visibility && (
            <Pressable onPress={toggleSecureEntry}>
              {isHidden ? (
                <MaterialIcons name="visibility" size={24} color="black" />
              ) : (
                <MaterialIcons name="visibility-off" size={24} color="black" />
              )}
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
  errorMessage: {
    color: "red",
  },
});
