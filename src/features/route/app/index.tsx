import { RootStack } from "../root-stack";
import { HomePage } from "../../home/component";

export const AppStack = () => {
  return (
    <RootStack.Group>
      <RootStack.Screen name="Home" component={HomePage} />
    </RootStack.Group>
  );
};
