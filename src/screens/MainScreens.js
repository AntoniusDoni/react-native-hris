import { useAuth } from "../contexts/AuthContexts";
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from "./Auth/LoginScreen";
import Tabs from "./components/TabsButton";

const Stack = createNativeStackNavigator()

export default function MainScreen(props){
    const { user } = useAuth()
    // console.log(props)
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