import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import {ThemeProvider} from './src/theme/ThemeProvider';
import RootNavigator from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <RootNavigator/>
    </ThemeProvider>
  );
}
export default App;
