import React, { useState, useEffect } from "react";

import * as Location from "expo-location";
import { LocationObject } from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState<LocationObject>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage(
          "O aplicativo necessita da sua localização para fornecer os dados adequadamente!"
        );
        return errorMessage;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return location;
};

export default useLocation;
