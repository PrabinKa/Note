import React, { useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import responsiveSize from '../../utils/ResponsiveSize';
import {useTheme} from '../../theme/ThemeProvider';

interface Button {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

interface CustomModalProps {
  isVisible: boolean;
  onClose: () => void;
  buttons: Button[];
}

const CustomModal = ({
  isVisible,
  onClose,
  buttons,
}: CustomModalProps) => {
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
        <View
          style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: colors.secondary,
            }}>
            Operations
          </Text>
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={button.onPress}
              style={styles.operationsButtonWrapper}>
              <Text style={[styles.operationButtonText, {color: colors.text}]}>
                {button.text}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.closeButton, {backgroundColor: colors.button}]}
            onPress={onClose}>
            <Text style={[styles.closeButtonText, {color: colors.text}]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(CustomModal);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: responsiveSize(250),
    width: '70%',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
  operationsButtonWrapper: {
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#D4D4D4',
  },
  operationButtonText: {
    fontWeight: '700',
  },
});
