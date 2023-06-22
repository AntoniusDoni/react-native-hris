import { AppProvider } from "./src/contexts/AuthContexts";
import MainScreen from "./src/screens/MainScreens";

export default function App() {
 
  return (
    <AppProvider>
          <MainScreen />
    </AppProvider>
  );
}

