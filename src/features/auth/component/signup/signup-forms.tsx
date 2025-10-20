import { Controller } from "react-hook-form";
import { StyleSheet, Text } from "react-native";
import { FormField } from "../../../../shared/form-field";
import { Spacing } from "../../../../shared/spacing";

export const SignupForms = ({
  setFormData,
}: {
  setFormData: (input: Record<string, unknown>) => void;
}) => {
  return (
    <>
      <Text>Name</Text>
      <Spacing size={"sm"} />
      <Controller
        name="name"
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <FormField
                value={field.value}
                style={signupFormStyle.labelContainer}
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
      <Text>Email</Text>
      <Spacing size={"sm"} />
      <Controller
        name="email"
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <FormField
                value={field.value}
                style={signupFormStyle.labelContainer}
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
                value={field.value}
                style={signupFormStyle.labelContainer}
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
    </>
  );
};

const signupFormStyle = StyleSheet.create({
  labelContainer: {
    paddingHorizontal: 10,
  },
});
