import React from 'react';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../../theme/ThemeProvider';
import responsiveSize from '../../../utils/ResponsiveSize';

export default function NoteSearchBar() {
  const {colors} = useTheme();

  return (
    <View>
      <TextInput
        placeholder="Search notes"
        placeholderTextColor={'#D4D4D4'}
        selectionColor={colors.background}
        style={[
          styles.searchBox,
          {backgroundColor: colors.text, color: colors.background},
        ]}
      />
      <View style={styles.searchIconWrapper}>
        <Ionicons name="search" size={20} color={colors.background} />
      </View>
      <View style={styles.searchButtonWrapper}>
        <Pressable style={({pressed}) => pressed && styles.itemPressed}>
          <Text
            style={{color: colors.background, fontWeight: '700', fontSize: 16}}>
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    height: 44,
    marginHorizontal: responsiveSize(10),
    paddingLeft: responsiveSize(40),
    paddingRight: responsiveSize(60),
    borderRadius: responsiveSize(20),
  },
  searchIconWrapper: {
    position: 'absolute',
    height: 44,
    left: responsiveSize(12),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonWrapper: {
    position: 'absolute',
    height: 44,
    right: responsiveSize(12),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemPressed: {
    opacity: 0.5,
  },
});
