import {openDatabase} from 'react-native-sqlite-storage';
import {Alert} from 'react-native';

let db = openDatabase({name: 'NoteTakingAppDatabase.db'});

interface Note {
  id: string;
  noteTitle: string;
  noteCategory: string;
  createdDate: string;
  note: string;
}

export async function fetchNotesFromDatabase(callback: (temp: Note[]) => void) {
  (await db).transaction(tx => {
    tx.executeSql('SELECT * FROM table_note', [], (tx, results) => {
      let temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      callback(temp);
    });
  });
}

export async function editNotesInDatabase(data: Note, navigation: any) {
  const {id, noteTitle, noteCategory, createdDate, note} = data;

  (await db).transaction(tx => {
    tx.executeSql(
      'UPDATE table_note set noteTitle=?, noteCategory=? , createdDate=?, note=? where id=?',
      [noteTitle, noteCategory, createdDate, note, id],
      (tx, results) => {
        if (results.rowsAffected > 0) {
          navigation.goBack();
          Alert.alert('Success', 'User updated successfully');
        } else Alert.alert('Updation Failed', 'Please try again later!');
      },
    );
  });
}

export async function deleteNoteFromDatabase(id : string): Promise<boolean> {
  return new Promise(async (resolve) => {
    (await db).transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_note WHERE id = ?',
        [id],
        (tx, results) => {
          const isDeleted = results.rowsAffected > 0;
          resolve(isDeleted);
        }
      );
    });
});
}

export async function fetchArchiveNotesFromDatabase(callback: (temp: Note[]) => void) {
  (await db).transaction(tx => {
    tx.executeSql('SELECT * FROM archive_note', [], (tx, results) => {
      let temp = [];
      for (let i = 0; i < results.rows.length; ++i) {
        temp.push(results.rows.item(i));
      }
      callback(temp);
    });
  });
}
