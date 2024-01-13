import {StyleSheet, Text, View, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';

interface ButtonProps {
  colors: Record<string, string>;
  children: string;
  buttonStyles?: ViewStyle;
}

export default function Button({colors,children, buttonStyles}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
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

