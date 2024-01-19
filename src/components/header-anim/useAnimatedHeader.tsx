import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const CONTAINER_HEIGHT = 80;

const useAnimatedHeader = () => {
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

  const Translate = clampedScroll.interpolate({
    inputRange: [0, CONTAINER_HEIGHT],
    outputRange: [0, -CONTAINER_HEIGHT],
    extrapolate: 'clamp',
  });

  let clampedScrollValue = 0;
  let offsetValue = 0;
  let scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - scrollValue;
      scrollValue = value;
      clampedScrollValue = Math.min(
        Math.max(clampedScrollValue * diff, 0),
        CONTAINER_HEIGHT,
      );
    });
    offsetAnim.addListener(({ value }) => {
      offsetValue = value;
    });

    return () => {
      // Cleanup listeners when component unmounts
      scrollY.removeAllListeners();
      offsetAnim.removeAllListeners();
    };
  }, [scrollY, offsetAnim]);

  let scrollEndTimer: NodeJS.Timeout | null = null;

  const onMomentumScrollBegin = () => {
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer);
    }
  };

  const onMomentumScrollEnd = () => {
    const toValue =
      scrollValue > CONTAINER_HEIGHT && clampedScrollValue > CONTAINER_HEIGHT / 2
        ? offsetValue + CONTAINER_HEIGHT
        : offsetValue - CONTAINER_HEIGHT;
    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const animatedHeaderProps = {
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    scrollY,
    Translate
  };

  return animatedHeaderProps;
};

export default useAnimatedHeader;
