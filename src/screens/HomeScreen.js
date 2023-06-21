import { SafeAreaView, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContexts";

export default function HomeScreen(){
    // const { user } = useAuth();
    // console.log(user);
    return(
        // <SafeAreaView>
            <View>
                <Text>Home</Text>
            </View>
        // </SafeAreaView>
    )
}