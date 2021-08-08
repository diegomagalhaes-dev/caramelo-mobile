import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";

import { useFonts } from "expo-font";
import {
  MPLUSRounded1c_400Regular,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_800ExtraBold,
} from "@expo-google-fonts/m-plus-rounded-1c";

import FeedersMap from "./src/Screens/FeedersMap";

export default function App() {
  const [fontsLoaded] = useFonts({
    MPLUSRounded1c_400Regular,
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <FeedersMap />;
}

const styles = EStyleSheet.create({});
EStyleSheet.build();
