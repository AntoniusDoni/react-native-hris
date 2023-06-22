import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useAuth } from "../../contexts/AuthContexts";
import { View } from "react-native";

export default function ProfilerScreen() {
  const { user, logout } = useAuth();
  
  return (
   <ScrollView>
    <View>
     <Text> {user.name}</Text>
    </View>
   </ScrollView>
  );
}

