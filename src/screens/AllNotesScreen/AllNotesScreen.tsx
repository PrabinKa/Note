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
  Modal,
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
import {fetchNotesFromDatabase} from '../../services/Database';

interface AllNotesScreenProps {
  navigation: any;
}

interface Note {
  createdDate: string;
  id: string;
  note: string;
  noteCategory: string;
  noteTitle: string;
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
          resizeMode="contain"
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
          <Text
            style={{color: colors.background, fontWeight: '700', fontSize: 16}}>
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
  const {colors, dark} = useTheme();
  const [notesData, setNotesData] = useState([...Notes]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [data, setData] = useState<Note[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchDataFromDatabase(); // Fetch data from the database when the component mounts

    // Listen for changes in navigation state
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataFromDatabase();
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [selectedCategory]);

  const fetchDataFromDatabase = () => {
    fetchNotesFromDatabase((data: Note[]) => {
      if (selectedCategory !== 'All') {
        let notes = data.filter(value => {
          return selectedCategory === value.noteCategory;
        });
        setData(notes);
      } else {
        setData(data);
      }
    });
  };

  const onClose = () => {
    setIsVisible(!isVisible);
  };

  const handleLongPress = () => {
    setIsVisible(!isVisible);
  };

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    let date = item.createdDate;

    return (
      <TouchableOpacity
        onPress={() => {navigation.navigate('EditNote', {item})}}
        onLongPress={() => {
          handleLongPress();
        }}
        style={[
          styles.noteDetailsContainer,
          {borderBottomColor: colors.accent},
        ]}>
        <Text style={{fontSize: 20, fontWeight: '700', color: colors.text}}>
          {item.noteTitle}
        </Text>
        <Text style={{fontSize: 12, fontWeight: '700', color: colors.text}}>
          {date.slice(0, 10)}
        </Text>
        <Text numberOfLines={5} style={{fontSize: 14, color: colors.text}}>
          {item.note}
        </Text>
      </TouchableOpacity>
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
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderNotesItem}
      />
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: dark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.4)',
            },
          ]}>
          <View
            style={[styles.modalContent, {backgroundColor: colors.background}]}>
            <Text style={{fontSize: 16, fontWeight: '500', color: colors.secondary}}>
              Perform Operation
            </Text>
            <TouchableOpacity style={styles.operationsButtonWrapper}>
              <Text style={[styles.operationButtonText, {color: colors.text}]}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.operationsButtonWrapper}>
              <Text style={[styles.operationButtonText, {color: colors.text}]}>
                Archive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.closeButton, {backgroundColor: colors.button}]}
              onPress={onClose}>
              <Text style={[styles.closeButtonText, {color: colors.text}]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    height: responsiveSize(250),
    width: '70%',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
  operationsButtonWrapper: {
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#D4D4D4',
  },
  operationButtonText: {
    fontWeight: '700',
  },
});
