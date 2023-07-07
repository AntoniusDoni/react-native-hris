import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../HomeScreen";
import LeavesScreen from "../Leaves/Leaves";

const HomeStack = createStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home Screen" component={HomeScreen} />
      <HomeStack.Screen name="Cuti Screen" component={LeavesScreen} />
    </HomeStack.Navigator>
  );
}
