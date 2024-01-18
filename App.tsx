import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import {useTheme} from './src/theme/ThemeProvider';

function App(): React.JSX.Element {
  const {colors} = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <RootNavigator />
    </>
  );
}
export default App;
