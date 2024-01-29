import React from 'react';
import { Text, View} from 'react-native';
import {useTheme} from '../../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';

interface EmptyNoteProps {
    message: string
}

export default function EmptyNote({message}: EmptyNoteProps) {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.text, fontSize: 20}}>{message}</Text>
      <Icon name="smile-o" size={30} color={colors.text} />
    </View>
  );
}
