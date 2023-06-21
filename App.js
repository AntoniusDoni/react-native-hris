import { AppProvider } from "./src/contexts/AuthContexts";
import { createNavigationContainerRef} from "@react-navigation/native"
import MainScreen from "./src/screens/MainScreens";
import { useRef } from "react";

export default function App() {
  const drawer = useRef(null);

  const navigationRef = createNavigationContainerRef();
  return (
    <AppProvider>
          <MainScreen navigationRef={navigationRef} drawer={drawer} />
    </AppProvider>
  );
}

