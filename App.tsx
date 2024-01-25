import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import {useTheme} from './src/theme/ThemeProvider';
import Toast from 'react-native-toast-message';
import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

// Define types for the database object
type Database = SQLiteDatabase;

function App(): React.JSX.Element {
  const {colors, dark} = useTheme();
  const [db, setDb] = useState<Database | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const databaseInstance = await openDatabase({
          name: 'NoteTakingAppDatabase.db',
        });
        // console.log('Database opened successfully');
        setDb(databaseInstance);
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    initializeDatabase();
  }, []);

  useEffect(() => {
    if (db) {
      db.transaction((txn): void => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='table_note'",
          [],
          (tx, res): void => {
            console.log('item note:', res.rows.length);
            if (res.rows.length === 0) {
              tx.executeSql('DROP TABLE IF EXISTS table_note', []);
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS table_note(id VARCHAR(50), noteTitle VARCHAR(100), noteCategory VARCHAR(50), createdDate VARCHAR(50), note VARCHAR(500))',
                [],
              );
            }
          },
        );
      });
      db.transaction((txn): void => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='archive_note'",
          [],
          (tx, res): void => {
            console.log('item archive:', res.rows.length);
            if (res.rows.length === 0) {
              tx.executeSql('DROP TABLE IF EXISTS archive_note', []);
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS archive_note(id VARCHAR(50), noteTitle VARCHAR(100), noteCategory VARCHAR(50), createdDate VARCHAR(50), note VARCHAR(500))',
                [],
              );
            }
          },
        );
      });
      db.transaction((txn): void => {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='trash_note'",
          [],
          (tx, res): void => {
            console.log('item trash:', res.rows.length);
            if (res.rows.length === 0) {
              tx.executeSql('DROP TABLE IF EXISTS trash_note', []);
              tx.executeSql(
                'CREATE TABLE IF NOT EXISTS trash_note(id VARCHAR(50), noteTitle VARCHAR(100), noteCategory VARCHAR(50), createdDate VARCHAR(50), note VARCHAR(500))',
                [],
              );
            }
          },
        );
      });
    }
  }, [db]);

  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
      <Toast />
    </>
  );
}
export default App;
