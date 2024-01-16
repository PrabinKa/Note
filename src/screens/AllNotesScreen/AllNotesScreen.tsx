import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

import {DrawerParamList} from '../../navigation/DrawerNavigator';
import {RouteProp} from '@react-navigation/native';
import {useTheme} from '../../theme/ThemeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NotesCategory, Notes} from '../../constants/Constants';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

type AllNotesScreenRouteProp = RouteProp<DrawerParamList, 'AllNotes'>;

interface AllNotesScreenProps {
  navigation: any; // Change this to the correct type
}

interface Note {
  id: number;
  noteTitle: string;
  date: string;
  note: string;
}

export default function AllNotesScreen({navigation}: AllNotesScreenProps) {
  const {colors} = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    return (
      <View
        style={[styles.noteDetailsContainer, {borderTopColor: colors.text}]}>
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
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../assets/user.png')}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={[styles.welcomeText, {color: colors.text}]}>
            <Text style={{fontSize: responsiveFontSize(1.5), color: '#D3D3D3'}}>
              Welcome
            </Text>{' '}
            Prabin Karki
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.openDrawer()}>
          <Image
            source={require('../../assets/drawer.png')}
            style={{
              height: responsiveWidth(15),
              width: responsiveWidth(12),
              tintColor: colors.text,
              alignSelf: 'flex-end',
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[styles.headerContainer, {marginVertical: responsiveHeight(2)}]}>
        <Text style={{color: colors.text, fontSize: responsiveFontSize(5)}}>
          Your Notes
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.addNoteButton, {backgroundColor: colors.text}]}>
          <Ionicons name="add-sharp" color={colors.background} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: responsiveHeight(2)}}>
        <ScrollView horizontal>
          {NotesCategory.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectedCategory(item.category);
                }}
                style={[
                  styles.notesCategoryButton,
                  {
                    backgroundColor:
                      selectedCategory === item.category
                        ? colors.secondary
                        : colors.background,
                    borderColor: colors.text,
                  },
                ]}>
                <Text
                  style={[
                    styles.notesCategoryText,
                    {color: colors.text},
                  ]}>{`#${item.category}`}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        data={Notes}
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
    paddingHorizontal: responsiveWidth(5),
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 15,
  },
  welcomeText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveWidth(2),
  },
  addNoteButton: {
    height: responsiveWidth(13),
    width: responsiveWidth(13),
    borderRadius: responsiveWidth(2),
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
    fontSize: responsiveFontSize(2.25),
    fontWeight: '500',
  },
  noteDetailsContainer: {
    borderTopWidth: 1.5,
    paddingVertical: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(5),
  },
});
