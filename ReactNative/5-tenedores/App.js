import { LogBox } from "react-native";
import {AppNavigation } from "./src/navigation/AppNavigation";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import { initFirebase } from "./src/utils/";

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>

      <Toast />
    </>
  );
}

