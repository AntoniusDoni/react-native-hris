import { useAuth } from "../contexts/AuthContexts";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from "./Auth/LoginScreen";
import HomeScreen from "./HomeScreen";
import { theme } from "./theme/theme";
import Tabs from "./components/TabsButton";

const Stack = createNativeStackNavigator()

export default function MainScreen(){
    const { user } = useAuth()
    return (
        <NavigationContainer >
        {
            user===null?(
                <Stack.Navigator   
                initialRouteName="LoginScreen"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Navigator>
            ):(
                <Tabs></Tabs>
            )
        }
        </NavigationContainer>
    );
}