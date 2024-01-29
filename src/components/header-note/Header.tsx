import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';

interface HeaderProps {
  onPress: () => void;
  title: string;
}

export default function Header({onPress, title}: HeaderProps) {
  const {colors} = useTheme();

  return (
    <View style={styles.headerWrapper}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <Ionicons
          name="chevron-back-sharp"
          size={responsiveSize(40)}
          color={colors.primary}
        />
      </Pressable>
      <Text
        style={{
          fontSize: responsiveSize(24),
          fontWeight: '500',
          color: colors.primary,
          marginLeft: 30,
        }}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(5),
  },
  pressed: {
    opacity: 0.5,
  },
});
