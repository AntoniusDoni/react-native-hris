import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme/theme";
import ProfilerScreen from "../Profile/ProfileScreen";
import LeavesScreen from "../Leaves/Leaves";
import AttendaceScreen from "../Attandace/AttendaceScreen";
import { useAuth } from "../../contexts/AuthContexts";
import HomeStackScreen from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { user } = useAuth;

  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#e91e63" style={{ backgroundColor: "tomato" }} >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerShown:false,
          tabBarLabel: "Halaman Utama",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={theme.colors.primary}
              size={27}
            />
          ),
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: {
            fontSize: 12,
            padding: 5,
          },
        }}
      />
      <Tab.Screen
        name="Absensi"
        component={AttendaceScreen}
        options={{
          tabBarLabel: "Absensi",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-account"
              color={theme.colors.primary}
              size={26}
            />
          ),
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: {
            fontSize: 12,
            padding: 5,
          },
        }}
      />
      <Tab.Screen
        name="Pengajuan Cuti"
        component={LeavesScreen}
        options={{
          tabBarLabel: "Cuti",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-arrow-left"
              color={theme.colors.primary}
              size={26}
            />
          ),
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: {
            fontSize: 12,
            padding: 5,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilerScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-box"
              color={theme.colors.primary}
              size={26}
            />
          ),
          tabBarActiveTintColor: "#e91e63",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: {
            fontSize: 12,
            padding: 5,
          },
        }}
      />
    </Tab.Navigator>
  );
}
