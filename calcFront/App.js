import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet} from 'react-native';
import AppNavigator from './app/infrastructure/navigation/app.navigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
