import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../../context/auth-context";
import { useState } from "react";
import LoadingOverlay from "../../../../shared/loading-layout";
import { useNavigation } from "@react-navigation/native";
import { LoginForms } from "./login-forms";
import { FormProvider, useForm } from "react-hook-form";
import { createLoginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";

export const LoginPage = () => {
  const { handleLogin, formData, setFormData } = useAuthContext();

  const loginSchema = createLoginSchema();

  const navigation = useNavigation();

  const [isLoading, setLoading] = useState<boolean>(false);

  const initialValue = {
    email: formData["email"] || undefined,
    password: formData["password"] || undefined,
  };

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: initialValue,
  });

  const onSubmit = async (data: Record<string, unknown>) => {
    setLoading(true);
    const isValid = await form.trigger();

    if (!isValid) return;
    try {
      const response = await handleLogin({
        email: `${data["email"]}`,
        password: `${data["password"]}`,
      });
      1;

      if (response && response?.token) {
        Toast.show({
          type: "success",
          text1: "Successfully logged in",
        });
        /// Navigation handled @ RootNavigator
        form.reset();
      } else {
        Toast.show({
          type: "error",
          text1: `${response?.errorMessage ?? "Login failed"}`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `${error ?? "Login failed"}`,
      });
      setLoading(false);
    }
    setLoading(false);
  };

  const navigateSignup = () => {
    navigation.navigate("Signup" as never);
    form.reset();
  };

  return (
    <View style={loginStyles.root}>
      <LoadingOverlay isLoading={isLoading} />
      <View style={loginStyles.fieldRoot}>
        <FormProvider {...form}>
          <LoginForms setFormData={setFormData} />
        </FormProvider>
      </View>
      <View style={[loginStyles.buttonContainer, { marginBottom: 20 }]}>
        <View style={{ marginBottom: 10 }}>
          <Button title="Sign up" onPress={navigateSignup} color="#007AFF" />
        </View>
        <Button
          title="Login"
          onPress={form.handleSubmit(onSubmit)}
          color="#007AFF"
        />
      </View>
    </View>
  );
};

const loginStyles = StyleSheet.create({
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
