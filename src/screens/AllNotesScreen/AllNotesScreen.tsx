import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';

import {CustomModal, NoteContainer, EmptyNote} from '../../components';

import {
  fetchNotesFromDatabase,
  deleteNoteFromDatabase,
  fetchNotesCategoryFromDatabase,
} from '../../services/Database';

import {openDatabase} from 'react-native-sqlite-storage';
import NotesCategoryButtons from './components/NotesCategoryButtons';
import NoteScreenHeader from './components/NoteScreenHeader';
import NoteSearchBar from './components/NoteSearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';

let db = openDatabase({name: 'NoteTakingAppDatabase.db'});

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

interface category {
  id: number;
  category: string;
}

export default function AllNotesScreen({navigation}: AllNotesScreenProps) {
  const {colors, dark} = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [data, setData] = useState<Note[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note>();
  const [categories, setCategories] = useState<category[]>([]);


  const archiveNotesHandler = async () => {
    const {id, noteTitle, noteCategory, createdDate, note} = selectedNote || {};
    setIsVisible(!isVisible);

    (await db).transaction(async tx => {
      tx.executeSql(
        'INSERT INTO archive_note (id, noteTitle, noteCategory, createdDate, note) VALUES (?,?,?,?,?)',
        [id, noteTitle, noteCategory, createdDate, note],
        async (tx: any, results: {rowsAffected: number}) => {
          if (results.rowsAffected > 0 && id) {
            try {
              const isDeleted = await deleteNoteFromDatabase(id);

              if (isDeleted) {
                ToastAndroid.show('Note Archived', ToastAndroid.SHORT);
              }
            } catch (error) {
              console.error('Error deleting note:', error);
            }
          } else {
            ToastAndroid.show('Note Archiving failed!', ToastAndroid.SHORT);
          }
        },
      );
    });
  };

  const moveNotesToTrashHandler = async () => {
    const {id, noteTitle, noteCategory, createdDate, note} = selectedNote || {};
    setIsVisible(!isVisible);

    (await db).transaction(async tx => {
      tx.executeSql(
        'INSERT INTO trash_note (id, noteTitle, noteCategory, createdDate, note) VALUES (?,?,?,?,?)',
        [id, noteTitle, noteCategory, createdDate, note],
        async (tx: any, results: {rowsAffected: number}) => {
          if (results.rowsAffected > 0 && id) {
            try {
              const isDeleted = await deleteNoteFromDatabase(id);
              if (isDeleted) {
                ToastAndroid.show('Note is moved to Trash', ToastAndroid.SHORT);
              }
            } catch (error) {
              console.error('Error deleting note:', error);
            }
          } else {
            ToastAndroid.show('Deleting note failed!', ToastAndroid.SHORT);
          }
        },
      );
    });
  };

  useEffect(() => {
    fetchDataFromDatabase(); // Fetch data from the database when the component mounts

    // Listen for changes in navigation state
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataFromDatabase();
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [selectedCategory, archiveNotesHandler, moveNotesToTrashHandler]);

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

    // fetchNotesCategoryFromDatabase((data: category[]) => {
    //   setCategories(data);
    // });
  };

  const handleOnClose = () => {
    setIsVisible(!isVisible);
  };

  const handleLongPress = (item: Note) => {
    setIsVisible(!isVisible);
    setSelectedNote(item);
  };

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    return (
      <NoteContainer
        item={item}
        onPress={() => navigation.navigate('EditNote', {item})}
        onLongPress={() => handleLongPress(item)}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <NoteScreenHeader navigation={navigation} />
      <View
        style={[styles.headerContainer, {marginVertical: responsiveSize(10)}]}>
        <Text style={{color: colors.text, fontSize: responsiveSize(35)}}>
          Your Notes
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateNote')}
          activeOpacity={0.5}
          style={[styles.addNoteButton, {backgroundColor: colors.text}]}>
          <Ionicons name="add-sharp" color={colors.background} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{marginHorizontal: responsiveSize(15)}}>
        <NoteSearchBar />
      </View>
      <View
        style={{
          marginTop: responsiveSize(20),
          paddingBottom: responsiveSize(20),
          borderBottomColor: colors.accent,
          borderBottomWidth: 2,
        }}>
        <NotesCategoryButtons
          selectedCategory={selectedCategory}
          onSelect={category => setSelectedCategory(category)}
        />
      </View>
      {data.length !== 0 ? (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `item ${item.id}`}
          renderItem={renderNotesItem}
        />
      ) : (
        <EmptyNote message={'Unleash Your thoughts!'} />
      )}
      <CustomModal
        isVisible={isVisible}
        onClose={handleOnClose}
        buttons={[
          {text: 'Archive', onPress: archiveNotesHandler},
          {text: 'Delete', onPress: moveNotesToTrashHandler},
        ]}
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
  addNoteButton: {
    height: responsiveSize(50),
    width: responsiveSize(50),
    borderRadius: responsiveSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteDetailsContainer: {
    borderBottomWidth: 2,
    paddingVertical: responsiveSize(15),
    paddingHorizontal: responsiveSize(15),
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
