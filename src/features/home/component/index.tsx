import { Button, StyleSheet, Text, View } from "react-native";
import { useAuthContext } from "../../auth/context/auth-context";
import { Spacing } from "../../../shared/spacing";

export const HomePage = () => {
  const { handleLogout, userInfo } = useAuthContext();
  return (
    <View style={homeStyles.root}>
      <View style={homeStyles.content}>
        <Text style={{ alignSelf: "center" }}>{userInfo?.email}</Text>
        <Spacing size="md" />
        <Text style={{ alignSelf: "center" }}>{userInfo?.name}</Text>
        <Spacing size="md" />
        <Button onPress={handleLogout} title="Logout"></Button>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 24,
  },
});
