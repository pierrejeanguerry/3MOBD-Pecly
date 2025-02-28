import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  Modal,
  View,
  TouchableNativeFeedback,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from "react-native";
import { ModalSize } from "./CustomModal.types";
import { theme } from "@/styles/theme";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size: ModalSize;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  children,
  title,
  size,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, styles[size]]}>
              {title ? (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  <TouchableNativeFeedback
                    style={styles.closeButton}
                    onPress={onClose}
                  >
                    <FontAwesome size={25} name="close" />
                  </TouchableNativeFeedback>
                </View>
              ) : (
                <TouchableNativeFeedback
                  style={styles.closeButton}
                  onPress={onClose}
                >
                  <FontAwesome size={25} name="close" />
                </TouchableNativeFeedback>
              )}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: theme.colors.backgroundTertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  small: {
    height: 300,
  },
  medium: {
    height: 500,
  },
  long: {
    height: "95%",
  },
});

export default CustomModal;
