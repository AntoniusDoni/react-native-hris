import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs(props) {
  const { drawer, navigation } = props;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      style={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Halaman Utama",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={HomeScreen}
        options={{
          tabBarLabel: "Keluar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="logout" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}
