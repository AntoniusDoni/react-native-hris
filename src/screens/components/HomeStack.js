import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../HomeScreen";
import LeavesScreen from "../Leaves/Leaves";
import ListAttendanceScreen from '../Attandace/ListAttendanceScreen';

const HomeStack = createStackNavigator();
export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: true }}>
      <HomeStack.Screen name="Home " component={HomeScreen} />
      <HomeStack.Screen name="Riwayat Absensi" component={ListAttendanceScreen} />
    </HomeStack.Navigator>
  );
}
