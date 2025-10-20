import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";

interface LoadingOverlayProps {
  isLoading: boolean;
  indicatorColor?: string;
  boxBackgroundColor?: string;
  overlayBackgroundColor?: string;
}

const { width, height } = Dimensions.get("window");

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  indicatorColor,
  overlayBackgroundColor,
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View
        style={[
          styles.overlay,
          { backgroundColor: overlayBackgroundColor ?? "rgba(0, 0, 0, 0.4)" },
        ]}
      >
        <ActivityIndicator size="large" color={indicatorColor ?? "#FFFFFF"} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBox: {
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
    minHeight: 100,
  },
});

export default LoadingOverlay;
