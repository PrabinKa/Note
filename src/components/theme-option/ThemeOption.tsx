import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import responsiveSize from '../../utils/ResponsiveSize';
import { useTheme } from '../../theme/ThemeProvider';

interface ThemeOptionProps {
    onPress: () => void;
    isSelected: boolean;
    text: string;
    backgroundColor: string;
}

const ThemeOption = ({ onPress, isSelected, text, backgroundColor }: ThemeOptionProps) => {
    const {colors} = useTheme();

  return (
    <View style={styles.themeOption}>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.radioOption,
        { borderColor: colors.accent, backgroundColor },
      ]}
    ></TouchableOpacity>
    <Text style={[styles.radioText, { color: colors.text }]}>
      {text}
    </Text>
    </View>
  );
};

export default ThemeOption;

const styles = StyleSheet.create({
    themeOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveSize(30),
      },
    radioOption: {
        height: responsiveSize(20),
        width: responsiveSize(20),
        borderRadius: responsiveSize(10),
        borderWidth: responsiveSize(1),
      },
      radioText: {
        fontSize: responsiveSize(16),
        marginLeft: responsiveSize(20),
      },
})