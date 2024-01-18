import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';
import {NotesCategory, Notes} from '../../constants/Constants';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

interface AllNotesScreenProps {
  navigation: any;
}

interface Note {
  id: number;
  noteTitle: string;
  date: string;
  note: string;
  category: string;
}

interface NotesCategoryTypes {
  id: number;
  category: string;
}

const Header = ({navigation}: AllNotesScreenProps) => {
  const {colors} = useTheme();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Image
          source={require('../../assets/user.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={[styles.welcomeText, {color: '#888'}]}>
          <Text style={{fontSize: responsiveFontSize(1.5)}}>Welcome</Text>{' '}
          Prabin Karki
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.openDrawer()}>
        <Image
          resizeMode='contain'
          source={require('../../assets/drawer.png')}
          style={[styles.drawerIcon, {tintColor: colors.text}]}
        />
      </TouchableOpacity>
    </View>
  );
};

interface ColorType {
  colors: Record<string, string>;
}

const SearchBar = ({colors}: ColorType) => {
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
          <Text style={{color: colors.background, fontWeight: '700', fontSize: 16}}>
            Search
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

interface NoteCategoryButtonsProps {
  categories: NotesCategoryTypes[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  colors: ColorType['colors'];
}

const NotesCategoryButtons = ({
  categories,
  selectedCategory,
  onSelect,
  colors,
}: NoteCategoryButtonsProps) => {
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
};

export default function AllNotesScreen({navigation}: AllNotesScreenProps) {
  const {colors} = useTheme();
  const [notesData, setNotesData] = useState([...Notes]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    filterNotesByCategory();
  }, [selectedCategory]);

  const filterNotesByCategory = () => {
    if (selectedCategory === 'All') {
      setNotesData(Notes);
    } else {
      let data = Notes.filter(value => {
        return selectedCategory === value.category;
      });
      setNotesData(data);
    }
  };

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    return (
      <View
        style={[styles.noteDetailsContainer, {borderBottomColor: colors.accent}]}>
        <Text style={{fontSize: 20, fontWeight: '700', color: colors.text}}>
          {item.noteTitle}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '700', color: colors.text}}>
          {item.date}
        </Text>
        <Text numberOfLines={5} style={{fontSize: 14, color: colors.text}}>
          {item.note}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Header navigation={navigation} />
      <View
        style={[styles.headerContainer, {marginVertical: responsiveHeight(2)}]}>
        <Text style={{color: colors.text, fontSize: responsiveFontSize(5)}}>
          Your Notes
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateNote')}
          activeOpacity={0.5}
          style={[styles.addNoteButton, {backgroundColor: colors.text}]}>
          <Ionicons name="add-sharp" color={colors.background} size={30} />
        </TouchableOpacity>
      </View>
      <SearchBar colors={colors} />
      <View
        style={{
          marginTop: responsiveHeight(2),
          paddingBottom: responsiveHeight(2),
          borderBottomColor: colors.accent,
          borderBottomWidth: 2,
        }}>
        <NotesCategoryButtons
          categories={NotesCategory}
          selectedCategory={selectedCategory}
          onSelect={category => setSelectedCategory(category)}
          colors={colors}
        />
      </View>
      <FlatList
        data={notesData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderNotesItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(15),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 15,
  },
  welcomeText: {
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
  },
  drawerIcon: {
    height: responsiveWidth(15),
    width: responsiveWidth(12),
    alignSelf: 'flex-end',
  },
  addNoteButton: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBox: {
    height: 44,
    marginHorizontal: responsiveWidth(10),
    paddingLeft: responsiveSize(40),
    paddingRight: responsiveSize(60),
    borderRadius: responsiveSize(20),
  },
  searchIconWrapper: {
    position: 'absolute',
    height: 44,
    left: responsiveWidth(12),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonWrapper: {
    position: 'absolute',
    height: 44,
    right: responsiveWidth(12),
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  noteDetailsContainer: {
    borderBottomWidth: 2,
    paddingVertical: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(5),
  },
  itemPressed: {
    opacity: 0.2,
  },
});
