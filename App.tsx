import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import {useTheme} from './src/theme/ThemeProvider';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  const {colors, dark} = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={ dark ? 'light-content' : 'dark-content'}
      />
      <RootNavigator />
      <Toast/>
    </>
  );
}
export default App;
