import React, {memo, useCallback, useMemo} from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import responsiveSize from '../../../utils/ResponsiveSize';
import { useTheme } from '../../../theme/ThemeProvider';
import { NotesCategory } from '../../../constants/Constants';

interface NoteCategoryButtonsProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const NotesCategoryButtons = ({
  selectedCategory,
  onSelect
}: NoteCategoryButtonsProps) => {
  const {colors} = useTheme();

  const memoizedSelectedCategory = useMemo(() => selectedCategory, [selectedCategory]);

  const handleSelect = useCallback((category: string) => {
    onSelect(category);
  }, [onSelect]);

  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}>
      {NotesCategory.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleSelect(item.category)}
          style={[
            styles.notesCategoryButton,
            {
              backgroundColor:
              memoizedSelectedCategory === item.category
                  ? colors.button
                  : colors.background,
              borderColor: colors.text,
            },
          ]}>
          <Text style={[styles.notesCategoryText, {color: colors.text}]}>
            {`#${item.category}`}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default memo(NotesCategoryButtons);

const styles = StyleSheet.create({
  notesCategoryButton: {
    height: 30,
    paddingHorizontal: responsiveSize(20),
    marginHorizontal: responsiveSize(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(10),
    borderWidth: 1,
  },
  notesCategoryText: {
    fontSize: responsiveSize(16),
    fontWeight: '500',
  },
});
