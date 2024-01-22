import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {useTheme} from '../../theme/ThemeProvider';

interface ErrorMessageProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const ErrorMessage = ({isVisible, message, onClose}: ErrorMessageProps) => {
  const {colors, dark} = useTheme();
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor: dark
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.4)',
          },
        ]}>
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <Text style={[styles.modalTitle, { color: colors.secondary }]}>Error !</Text>
          <Text style={[styles.modalMessage, { color: colors.text }]}>{message}</Text>
          <TouchableOpacity style={[styles.closeButton, { backgroundColor: colors.button }]} onPress={onClose}>
            <Text style={[styles.closeButtonText, {color: colors.text}]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
});

export default ErrorMessage;
