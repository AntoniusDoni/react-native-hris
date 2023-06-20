import { AppProvider } from "./src/contexts/AuthContexts";
import {NavigationContainer} from "@react-navigation/native"
import MainScreen from "./src/screens/MainScreens";

export default function App() {
  return (
    <AppProvider>
          <MainScreen/>
    </AppProvider>
  );
}

