import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import PageHeader from "../../Components/PageHeader";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import MapView, { Marker, MapEvent } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

import bone from "../../images/bone.png";
import mapMarkerImg from "../../images/mapMarker.png";
import useLocation from "../../Utils/UseLocation";
import SvgComponent from "../../Components/Loading";

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
    navigation.navigate("FeederData" as never, { position } as never);
  }

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <PageHeader
            title="Fico feliz por sua boa ação!"
            subtitle="No mapa você escolhe um lugar para o comedouro."
          />
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

          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <FontAwesome name="angle-right" size={28} color="#fff" />
          </RectButton>
        </>
      ) : (
        <SvgComponent />
      )}
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
    width: "3rem",
    height: "3rem",
    backgroundColor: "#219EBC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    right: 20,
    bottom: 20,
  },
});

export default SelectMapPosition;
