import {
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';

interface ButtonProps {
  colors: Record<string, string>;
  children: string;
  buttonStyles?: ViewStyle;
  icon: ImageSourcePropType;
}

export default function ButtonWithIcon({
  children,
  buttonStyles,
  colors,
  icon,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: colors.button,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 8,
        paddingHorizontal: 30,
        ...(buttonStyles as object),
      }}>
      <Image source={icon} style={{height: 25, width: 25}} />
      <Text style={{color: colors.background, fontWeight: 'bold'}}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
