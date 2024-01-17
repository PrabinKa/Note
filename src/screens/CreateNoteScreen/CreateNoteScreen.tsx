import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/RootNavigator';

import {useTheme} from '../../theme/ThemeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import responsiveSize from '../../utils/ResponsiveSize';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

type CreateNoteScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateNote'
>;

interface CreateNoteScreenProps {
  navigation: CreateNoteScreenNavigationProp;
}

interface ColorProps {
  colors: Record<string, string>;
}

interface HeaderProps {
  colors: ColorProps['colors'];
  onPress: () => void;
}
const Header = ({colors, onPress}: HeaderProps) => {
  return (
    <View style={styles.headerWrapper}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <Ionicons
          name="chevron-back-sharp"
          size={responsiveSize(40)}
          color={colors.text}
        />
      </Pressable>
      <Pressable style={({pressed}) => pressed && styles.pressed}>
        <Ionicons
          name="ellipsis-vertical-outline"
          size={responsiveSize(30)}
          color={colors.text}
        />
      </Pressable>
    </View>
  );
};

export default function CreateNoteScreen({navigation}: CreateNoteScreenProps) {
  const {colors} = useTheme();
  const richText = React.useRef();

  const handleHead = () => <Text style={{color: colors.text}}>H1</Text>;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Header colors={colors} onPress={() => navigation.goBack()} />
      <View
        style={{
          paddingHorizontal: responsiveSize(15),
          paddingVertical: responsiveSize(30),
          borderBottomWidth: 3,
          borderBottomColor: colors.accent,
        }}>
        <TextInput
          placeholder="Note Title"
          placeholderTextColor={'#D4D4D4'}
          selectionColor={'#888'}
          style={{
            fontSize: responsiveSize(24),
            color: colors.text,
          }}
        />
        <Text
          style={{
            fontSize: responsiveSize(12),
            fontWeight: '500',
            color: colors.text,
            marginLeft: 3,
          }}>
          1/17/2024
        </Text>
      </View>
      {/* <RichEditor
        // ref={richText}
        onChange={descriptionText => {
          console.log('descriptionText:', descriptionText);
        }}
      />
      <RichToolbar
        editor={richText}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.heading1,
        ]}
        iconMap={{[actions.heading1]: handleHead}}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(5),
  },
  pressed: {
    opacity: 0.2,
  },
});
