import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ToastAndroid,
  Alert,
} from 'react-native';

import {DrawerParamList} from '../../navigation/DrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';
import Toast from 'react-native-toast-message';
import {useAnimatedHeader, CustomModal} from '../../components';
import {
  fetchTrashNotesFromDatabase,
  deleteTrashNotes,
} from '../../services/Database';

import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name: 'NoteTakingAppDatabase.db'});

type TrashNoteScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Trash'
>;

interface TrashNoteScreenProps {
  navigation: TrashNoteScreenNavigationProp;
}

interface Note {
  createdDate: string;
  id: string;
  note: string;
  noteCategory: string;
  noteTitle: string;
}

const CONTAINER_HEIGHT = 80;

export default function TrashNoteScreen({navigation}: TrashNoteScreenProps) {
  const {colors} = useTheme();
  const {
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    scrollY,
    Translate,
  } = useAnimatedHeader();
  const [trashNotes, setTrashNotes] = useState<Note[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note>();

  const restorePressHandler = async () => {
    setIsVisible(!isVisible);

    const {id, noteTitle, noteCategory, createdDate, note} = selectedNote || {};

    (await db).transaction(async tx => {
      tx.executeSql(
        'INSERT INTO table_note (id, noteTitle, noteCategory, createdDate, note) VALUES (?,?,?,?,?)',
        [id, noteTitle, noteCategory, createdDate, note],
        async (tx: any, results: {rowsAffected: number}) => {
          if (results.rowsAffected > 0 && id) {
            try {
              const isDeleted = await deleteTrashNotes(id);
              if (isDeleted) {
                ToastAndroid.show('Note deleted', ToastAndroid.SHORT);
              }
            } catch (error) {
              console.error('Error deleting note:', error);
            }
          } else {
            ToastAndroid.show('Note deleting failed!', ToastAndroid.SHORT);
          }
        },
      );
    });
  };

  const deletePressHandler = async () => {
    setIsVisible(!isVisible);
    const {id} = selectedNote || {};

    Alert.alert('Are you sure!!', 'This note will be deleted forever.', [
      {
        text: 'Cancel',
        onPress: () => ToastAndroid.show('Cancelled', ToastAndroid.SHORT),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          if (id) {
            try {
              const isDeleted = await deleteTrashNotes(id);
              if (isDeleted) {
                ToastAndroid.show('Note deleted', ToastAndroid.SHORT);
              }
            } catch (error) {
              ToastAndroid.show('Error deleting Note', ToastAndroid.SHORT);
            }
          }
        },
      },
    ]);
  };

  useEffect(() => {
    showToast();
  }, []);

  useEffect(() => {
    fetchDataFromDatabase(); // Fetch data from the database when the component mounts

    // Listen for changes in navigation state
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataFromDatabase();
    });

    // Clean up the subscription when the component unmounts
    return unsubscribe;
  }, [restorePressHandler, deletePressHandler]);

  const fetchDataFromDatabase = () => {
    fetchTrashNotesFromDatabase((data: Note[]) => {
      setTrashNotes(data);
    });
  };

  const showToast = () => {
    Toast.show({
      type: 'info',
      position: 'top',
      text2: 'Trash Notes will be automatically deleted after 7 days',
      visibilityTime: 10000,
    });
  };

  const handleOnClose = () => setIsVisible(!isVisible);

  const handleLongPress = (item: Note) => {
    setIsVisible(!isVisible);
    setSelectedNote(item);
  };

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    return (
      <TouchableOpacity
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
          {item.createdDate.slice(0, 10)}
        </Text>
        <Text numberOfLines={5} style={{fontSize: 14, color: colors.text}}>
          {item.note}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Animated.View
        style={[
          styles.headerWrapper,
          {
            backgroundColor: colors.background,
            transform: [{translateY: Translate}],
          },
        ]}>
        <Text
          style={{
            fontSize: responsiveSize(20),
            fontWeight: '700',
            color: colors.text,
          }}>
          Trash
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/drawer.png')}
            resizeMode="contain"
            style={{
              height: responsiveSize(50),
              width: responsiveSize(50),
              tintColor: colors.text,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </Animated.View>
      {trashNotes.length != 0 ? (
        <Animated.FlatList
          contentContainerStyle={styles.contentContainer}
          onMomentumScrollBegin={onMomentumScrollBegin}
          onMomentumScrollEnd={onMomentumScrollEnd}
          onScrollEndDrag={onScrollEndDrag}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          data={trashNotes}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderNotesItem}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.secondary}}>
            Notes are not added to Trash yet!
          </Text>
        </View>
      )}
      <CustomModal
        isVisible={isVisible}
        onClose={handleOnClose}
        modalTitle="Perform Operation"
        colors={colors}
        buttons={[
          {text: 'Restore', onPress: restorePressHandler},
          {text: 'Delete', onPress: deletePressHandler},
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: CONTAINER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    paddingHorizontal: responsiveSize(15),
    zIndex: 2,
  },
  noteDetailsContainer: {
    borderBottomWidth: 2,
    paddingVertical: responsiveSize(10),
    paddingHorizontal: responsiveSize(15),
  },
  contentContainer: {
    paddingTop: CONTAINER_HEIGHT,
  },
});
