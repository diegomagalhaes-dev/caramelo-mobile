import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import PageHeader from "../../Components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker, MapEvent } from "react-native-maps";
import { Feather } from "@expo/vector-icons";

import bone from "../../images/bone.png";
import mapMarkerImg from "../../images/mapMarker.png";
import useLocation from "../../Utils/UseLocation";

const SelectMapPosition = () => {
  const navigation = useNavigation();

  const location = useLocation();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (location) {
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  function handleSelectedPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate("FeederData", { position });
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Fico feliz por sua boa ação!"
        subtitle="No mapa você escolhe um lugar para o comedouro."
      />
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
          onPress={handleSelectedPosition}
          style={styles.mapStyle}
        >
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        </MapView>
      )}
      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>
          <Feather name="arrow-right" size={28} color="#fff" />
        </Text>
      </RectButton>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nextButton: {
    backgroundColor: "#023047",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    padding: 14,

    position: "absolute",
    right: 20,
    bottom: 20,
  },

  nextButtonText: {
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
});

export default SelectMapPosition;
