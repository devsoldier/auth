import { useState } from "react";
import { Control, Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput } from "react-native";
import { createLoginSchema } from "./schema";
import { FormField } from "../../../../shared/form-field";
import { Spacing } from "../../../../shared/spacing";

export const LoginForms = ({
  setFormData,
}: {
  setFormData: (input: Record<string, unknown>) => void;
}) => {
  return (
    <>
      <Text>Email</Text>
      <Spacing size={"sm"} />
      <Controller
        name="email"
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <FormField
                style={loginFormStyle.labelContainer}
                onChange={(event) => {
                  const { text } = event.nativeEvent;
                  field.onChange(text);
                  setFormData({ email: text });
                }}
                errorMessage={error?.message}
              ></FormField>
            </>
          );
        }}
      ></Controller>
      <Spacing size={"md"} />
      <Text>Password</Text>
      <Spacing size={"sm"} />
      <Controller
        name="password"
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <FormField
                style={loginFormStyle.labelContainer}
                onChange={(event) => {
                  const { text } = event.nativeEvent;
                  field.onChange(text);
                  setFormData({ password: text });
                }}
                errorMessage={error?.message}
                visibility={true}
              ></FormField>
            </>
          );
        }}
      ></Controller>
    </>
  );
};

const loginFormStyle = StyleSheet.create({
  labelContainer: {
    paddingHorizontal: 10,
  },
});
