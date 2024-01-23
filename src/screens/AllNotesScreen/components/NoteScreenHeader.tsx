import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../../../theme/ThemeProvider';
import responsiveSize from '../../../utils/ResponsiveSize';

const NoteScreenHeader = ({navigation}: any) => {
  const {colors} = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Image
          source={require('../../../assets/user.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={[styles.welcomeText, {color: '#888'}]}>
          <Text style={{fontSize: responsiveSize(12)}}>Welcome</Text> Prabin
          Karki
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.openDrawer()}>
        <Image
          resizeMode="contain"
          source={require('../../../assets/drawer.png')}
          style={[styles.drawerIcon, {tintColor: colors.text}]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NoteScreenHeader;

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
    height: responsiveSize(25),
    width: responsiveSize(25),
    borderRadius: responsiveSize(15),
  },
  welcomeText: {
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    marginLeft: responsiveSize(10),
  },
  drawerIcon: {
    height: responsiveSize(50),
    width: responsiveSize(45),
    alignSelf: 'flex-end',
  },
});
