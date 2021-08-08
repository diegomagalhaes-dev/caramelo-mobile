import React from "react";
import { Dimensions, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import EStyleSheet from "react-native-extended-stylesheet";

import { Feather } from "@expo/vector-icons";

import useLocation from "../Utils/UseLocation";

import mapMarker from "../images/mapMarker.png";
import dogCaramelo from "../images/dog.jpg";

const FeedersMap = () => {
  const location = useLocation();
  return (
    <View style={styles.container}>
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          <Marker
            icon={mapMarker}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Callout tooltip={true}>
              <View style={styles.PopUpContainer}>
                <Text style={styles.TextPopUp}>Caramelo App</Text>
                <Image style={styles.ImagePopUp} source={dogCaramelo} />
              </View>
            </Callout>
          </Marker>
        </MapView>
      )}
      <View style={styles.createFeeder}>
        <Text style={styles.textCreateFeeder}>2 comedouros encontrados</Text>
        <TouchableOpacity style={styles.createFeederButton}>
          <Feather name="plus" color="#FFFF" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default FeedersMap;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  PopUpContainer: {
    width: "12rem",
    height: "8rem",
    flexDirection: "column",
    backgroundColor: "#D4E4ED",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  TextPopUp: {
    fontSize: 16,
    color: "#023047",
    fontFamily: "MPLUSRounded1c_700Bold",
  },
  ImagePopUp: {
    maxWidth: 120,
    maxHeight: 80,
    borderRadius: 20,
  },
  createFeeder: {
    width: "90%",
    height: "3rem",
    paddingLeft: "1.4rem",
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 24,
    elevation: 3,
  },
  textCreateFeeder: {
    color: "#023047",
    fontFamily: "MPLUSRounded1c_700Bold",
  },
  createFeederButton: {
    width: "3rem",
    height: "3rem",
    backgroundColor: "#023047",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
