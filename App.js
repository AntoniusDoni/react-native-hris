import { createNavigationContainerRef } from '@react-navigation/native';
import React,{useRef} from 'react'
import { AppProvider } from "./src/contexts/AuthContexts";
import MainScreen from "./src/screens/MainScreens";

export default function App() {
  const drawer = useRef(null);

  const navigationRef = createNavigationContainerRef();
  return (
    <AppProvider>
          <MainScreen navigationRef={navigationRef} drawer={drawer}/>
    </AppProvider>
  );
}

