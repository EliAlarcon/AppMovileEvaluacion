import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { StackNavigator } from './src/navigator/StackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StackNavigator/>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
