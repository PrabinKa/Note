import {Dimensions, PixelRatio} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const baseScreenWidth = 375;

const scale = screenWidth / baseScreenWidth;

// Function to calculate responsive font size
export default function responsiveSize(fontSize: number) {
  const scaledFontSize = fontSize * scale;
  return Math.round(PixelRatio.roundToNearestPixel(scaledFontSize));
}
