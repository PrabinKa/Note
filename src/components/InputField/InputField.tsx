import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

interface inputProps {
    colors: Record<string, string>,
    placeholder: string
}

export default function InputField({colors, placeholder}: inputProps) {
  return (
    <TextInput
    placeholder={placeholder}
    selectionColor={colors.primary}
    style={{
      borderColor: colors.primary,
      borderWidth: 1.5,
      borderRadius: responsiveWidth(5),
      margin: responsiveHeight(2),
      width: responsiveWidth(80),
      fontSize: responsiveFontSize(2),
      color: colors.text,
      paddingHorizontal: responsiveWidth(3)
    }}
  />
  )
}

const styles = StyleSheet.create({})