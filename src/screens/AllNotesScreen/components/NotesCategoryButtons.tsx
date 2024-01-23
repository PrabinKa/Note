import React from 'react';
import {StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import responsiveSize from '../../../utils/ResponsiveSize';

interface NotesCategoryTypes {
  id: number;
  category: string;
}

interface ColorType {
  colors: Record<string, string>;
}

interface NoteCategoryButtonsProps {
  categories: NotesCategoryTypes[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  colors: ColorType['colors'];
}

export default function NotesCategoryButtons({
  categories,
  selectedCategory,
  onSelect,
  colors,
}: NoteCategoryButtonsProps) {
  return (
    <ScrollView horizontal showsVerticalScrollIndicator={false}>
      {categories.map(item => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onSelect(item.category)}
          style={[
            styles.notesCategoryButton,
            {
              backgroundColor:
                selectedCategory === item.category
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

const styles = StyleSheet.create({
  notesCategoryButton: {
    height: 30,
    paddingHorizontal: responsiveWidth(5),
    marginHorizontal: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(3),
    borderWidth: 1,
  },
  notesCategoryText: {
    fontSize: responsiveSize(16),
    fontWeight: '500',
  },
});
