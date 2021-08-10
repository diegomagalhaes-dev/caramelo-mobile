import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import FeedersMap from "./Screens/FeedersMap";
import FeederData from "./Screens/Create Feeder/FeederData";
import SelectMapPosition from "./Screens/Create Feeder/SelectMapPosition";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false,   }}>
        <Screen name="FeedersMap" component={FeedersMap} />
        <Screen name="SelectMapPosition" component={SelectMapPosition} />
        <Screen name="FeederData" component={FeederData} />
      </Navigator>
    </NavigationContainer>
  );
}
