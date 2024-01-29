import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';

interface Note {
  createdDate: string;
  id: string;
  note: string;
  noteCategory: string;
  noteTitle: string;
}

interface NoteContainerProps {
  item: Note;
  onLongPress: () => void;
  onPress?: () => void;
}

function NoteContainer({
  item,
  onLongPress,
  onPress,
}: NoteContainerProps) {
  const {colors} = useTheme();
  // console.log("note conatiner")
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.noteDetailsContainer, {borderBottomColor: colors.accent}]}>
      <Text style={{fontSize: 20, fontWeight: '700', color: colors.text}}>
        {item.noteTitle}
      </Text>
      <Text style={{fontSize: 12, fontWeight: '700', color: colors.text}}>
        {(item.createdDate).slice(0, 10)}
      </Text>
      <Text numberOfLines={5} style={{fontSize: 14, color: colors.text}}>
        {item.note}
      </Text>
    </TouchableOpacity>
  );
}

export default memo(NoteContainer);

const styles = StyleSheet.create({
  noteDetailsContainer: {
    borderBottomWidth: 1,
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(15),
  },
});
