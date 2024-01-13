import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

interface InputProps {
    secureTextEntry: boolean;
    colors: Record<string, string>,
    placeholder: string;
    onPress: () => void;
}

export default function InputFieldWithIcon({secureTextEntry, colors, placeholder, onPress}: InputProps) {
  return (
    <View style={[styles.container, {        borderColor: colors.primary,}]}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={{
            fontSize: responsiveFontSize(2),
            color: colors.text,
            width: responsiveWidth(70),
            paddingHorizontal: responsiveWidth(3)
          }}
      />
      <TouchableOpacity style={styles.eyeIcon} onPress={onPress} >
        <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: responsiveWidth(5),
        margin: responsiveHeight(2),
        width: responsiveWidth(80),
        fontSize: responsiveFontSize(2),
      },
      input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
      },
      eyeIcon: {
        padding: 10,
      },
})