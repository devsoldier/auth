import { Button, StyleSheet, View } from "react-native";
import LoadingOverlay from "../../../../shared/loading-layout";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthContext } from "../../context/auth-context";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSignupSchema } from "./schema";
import { SignupForms } from "./signup-forms";
import Toast from "react-native-toast-message";
import { SignupStatus } from "../../service/auth-service";

export const SignupPage = () => {
  const { handleSignup, formData, setFormData } = useAuthContext();

  const signupSchema = createSignupSchema();

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);
    const isValid = await form.trigger();

    if (!isValid) return;
    try {
      const response = await handleSignup({
        email: `${data["email"]}`,
        password: `${data["password"]}`,
        name: `${data["name"]}`,
      });

      if (response.status === SignupStatus.Success) {
        if (navigation.canGoBack()) navigation.goBack();
        navigation.navigate("Login" as never);
        Toast.show({
          type: "success",
          text1: `${response.message}`,
        });
      }

      Toast.show({
        type: "error",
        text1: `${response.message}`,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${error ?? "Login failed"}`,
      });
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <View style={signupStyles.root}>
      <LoadingOverlay isLoading={isLoading} />
      <View style={signupStyles.fieldRoot}>
        <FormProvider {...form}>
          <SignupForms setFormData={setFormData} />
        </FormProvider>
      </View>
      <View style={signupStyles.buttonContainer}>
        <Button
          title="Sign up"
          onPress={form.handleSubmit(onSubmit)}
          color="#007AFF"
        />
      </View>
    </View>
  );
};

const signupStyles = StyleSheet.create({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  fieldRoot: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
});
