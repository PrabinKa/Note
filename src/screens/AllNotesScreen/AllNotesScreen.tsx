import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useTheme} from '../../theme/ThemeProvider';
import {NotesCategory} from '../../constants/Constants';
import responsiveSize from '../../utils/ResponsiveSize';
import {NoteScreenHeader, NoteSearchBar, NotesCategoryButtons} from './index';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {
  fetchNotesFromDatabase,
  deleteNoteFromDatabase,
} from '../../services/Database';

import {openDatabase} from 'react-native-sqlite-storage';

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

export default function AllNotesScreen({navigation}: AllNotesScreenProps) {
  const {colors, dark} = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [data, setData] = useState<Note[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note>();

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

  useEffect(() => {
    fetchDataFromDatabase(); // Fetch data from the database when the component mounts

    // Listen for changes in navigation state
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataFromDatabase();
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [selectedCategory, archiveNotesHandler]);

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

  const handleLongPress = (item: Note) => {
    setIsVisible(!isVisible);
    setSelectedNote(item);
  };

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    let date = item.createdDate;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditNote', {item});
        }}
        onLongPress={() => {
          handleLongPress(item);
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
      <NoteScreenHeader navigation={navigation} />
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
      <NoteSearchBar />
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.secondary,
              }}>
              Perform Operation
            </Text>
            <TouchableOpacity style={styles.operationsButtonWrapper}>
              <Text style={[styles.operationButtonText, {color: colors.text}]}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                archiveNotesHandler();
              }}
              style={styles.operationsButtonWrapper}>
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
  addNoteButton: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteDetailsContainer: {
    borderBottomWidth: 2,
    paddingVertical: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(5),
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
