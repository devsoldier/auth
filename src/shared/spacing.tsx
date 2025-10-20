import { StyleSheet, View } from "react-native";

export type Size = "sm" | "md" | "lg";

export const Spacing = ({ size }: { size: Size }) => {
  const spacingMap = {
    sm: spacingStyles.sm,
    md: spacingStyles.md,
    lg: spacingStyles.lg,
  };

  return <View style={spacingMap[size]} />;
};

const spacingStyles = StyleSheet.create({
  sm: {
    height: 8,
  },
  md: {
    height: 16,
  },
  lg: {
    height: 24,
  },
});
