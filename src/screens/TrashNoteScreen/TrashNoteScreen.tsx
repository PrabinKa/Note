import React, {useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {DrawerParamList} from '../../navigation/DrawerNavigator';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';
import {Notes} from '../../constants/Constants';

type TrashNoteScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Trash'
>;

interface TrashNoteScreenProps {
  navigation: TrashNoteScreenNavigationProp;
}

interface Note {
  id: number;
  noteTitle: string;
  date: string;
  note: string;
  category: string;
}

const CONTAINER_HEIGHT = 80;

export default function TrashNoteScreen({navigation}: TrashNoteScreenProps) {
  const {colors} = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnim,
    ),
    0,
    CONTAINER_HEIGHT,
  );

  let clampedScrollValue: number = 0;
  let offsetValue = 0;
  let scrollValue: number = 0;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const diff = value - scrollValue;
      scrollValue = value;
      clampedScrollValue = Math.min(
        Math.max(clampedScrollValue * diff, 0),
        CONTAINER_HEIGHT,
      );
    });
    offsetAnim.addListener(({value}) => {
      offsetValue = value;
    });
  }, []);

  const Translate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: 'clamp',
  });

  let scrollEndTimer: NodeJS.Timeout | null = null;

  const onMomentumScrollBegin = () => {
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
    }
  };

  const onMementumScrollEnd = () => {
    const toValue =
      scrollValue > CONTAINER_HEIGHT &&
      clampedScrollValue > CONTAINER_HEIGHT / 2
        ? offsetValue + CONTAINER_HEIGHT
        : offsetValue - CONTAINER_HEIGHT;
    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMementumScrollEnd, 250);
  };

  const renderNotesItem = ({item}: {item: Note}): React.JSX.Element => {
    return (
      <View
        style={[
          styles.noteDetailsContainer,
          {borderBottomColor: colors.accent},
        ]}>
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

      <Animated.FlatList
        contentContainerStyle={styles.contentContainer}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMementumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        data={Notes}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => `${item.id}`}
        renderItem={renderNotesItem}
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
