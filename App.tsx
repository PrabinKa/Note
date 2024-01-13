import React from 'react';
import {SafeAreaView, View, StatusBar} from 'react-native';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import {ThemeProvider} from './src/theme/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
}
export default App;
