import {StyleSheet, Text, View, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';

interface ButtonProps {
  colors: Record<string, string>;
  children: string;
  buttonStyles?: ViewStyle;
  onPress: () => void
}

export default function Button({colors,children, buttonStyles, onPress}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        backgroundColor: colors.button,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 8,
        ...(buttonStyles as object)
      }}>
      <Text style={{color: colors.background, fontWeight: 'bold'}}>{children}</Text>
    </TouchableOpacity>
  );
}

