import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';
import {DrawerParamList} from '../../navigation/DrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useTheme} from '../../theme/ThemeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import responsiveSize from '../../utils/ResponsiveSize';
import {ThemeOption} from '../../components';

type SettingScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Settings'
>;

interface SettingsScreenProps {
  navigation: SettingScreenNavigationProp;
}

export default function SettingScreen({navigation}: SettingsScreenProps) {
  const {colors, dark, setScheme} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const Header = () => {
    return (
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={35} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]}>Settings</Text>
      </View>
    );
  };

  const toggleThemeColor = (option: string) => {
    setScheme(option);

    if (option) {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <Header />

      <View style={styles.titleWrapper}>
        <Text style={[styles.displayTitle, {color: colors.text}]}>
          Display Options
        </Text>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={'#D4D4D4'}
          onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.chooseThemeWrapper}>
            <Text style={[styles.themeText, {color: colors.text}]}>Theme</Text>
            <Text style={[styles.themeValue, {color: colors.text}]}>
              {dark ? 'Dark' : 'Light'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={[
            styles.centeredView,
            {
              backgroundColor: dark
                ? 'rgba(255, 255, 255, 0.2)'
                : 'rgba(0, 0, 0, 0.4)',
            },
          ]}>
          <View
            style={[styles.modalView, {backgroundColor: colors.background}]}>
            <Text style={[styles.modalTitle, {color: colors.text}]}>
              Choose Theme
            </Text>
            <ThemeOption
              onPress={() => toggleThemeColor('light')}
              isSelected={dark}
              text="Light"
              backgroundColor={dark ? colors.background : colors.text}
            />
            <ThemeOption
              onPress={() => toggleThemeColor('dark')}
              isSelected={!dark}
              text="Dark"
              backgroundColor={dark ? colors.text : colors.background}
            />
            <View style={styles.buttonWrapper}>
              <Pressable
                style={[styles.button, {backgroundColor: colors.button}]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(15),
  },
  headerTitle: {
    fontSize: responsiveSize(20),
    fontWeight: '700',
    marginLeft: responsiveSize(20),
  },
  titleWrapper: {
    paddingTop: responsiveSize(20),
  },
  chooseThemeWrapper: {
    height: responsiveSize(50),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(15),
  },
  displayTitle: {
    fontSize: responsiveSize(22),
    marginVertical: responsiveSize(20),
    paddingHorizontal: responsiveSize(15),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: responsiveSize(250),
    width: '70%',
    borderRadius: responsiveSize(10),
    padding: responsiveSize(20),
    elevation: 5,
  },
  modalTitle: {
    fontSize: responsiveSize(18),
    fontWeight: '500',
    marginVertical: responsiveSize(5),
  },
  buttonWrapper: {
    marginTop: responsiveSize(30),
    alignItems: 'flex-end',
  },
  button: {
    borderRadius: responsiveSize(20),
    height: responsiveSize(40),
    width: responsiveSize(100),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  themeText: {
    fontSize: responsiveSize(16),
    fontWeight: '500',
  },
  themeValue: {
    fontSize: responsiveSize(14),
  },
});
