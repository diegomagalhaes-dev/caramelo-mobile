import React, { useState } from "react";
import {
  Dimensions,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import EStyleSheet from "react-native-extended-stylesheet";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Svg, Image as ImageSvg } from "react-native-svg";

import { Feather } from "@expo/vector-icons";

import useLocation from "../Utils/UseLocation";

import mapMarker from "../images/mapMarker.png";
import dogCaramelo from "../images/dog.jpg";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";
import SvgComponent from "../Components/Loading";

interface Feeder {
  id: number;
  latitude: number;
  longitude: number;
  image: {
    url: string;
  };
}

const FeedersMap = () => {
  const [feeders, setFeeders] = useState<Feeder[]>([]);
  const navigation = useNavigation();
  const location = useLocation();

  useFocusEffect(() => {
    api.get("comedouros").then((response) => {
      setFeeders(response.data);
    });
  });

  function handleNavigateToCreateFeeder() {
    navigation.navigate("SelectMapPosition" as any);
  }

  function handleLinkingToGoogleMaps(feeder: Feeder) {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${feeder.latitude},${feeder.longitude}`
    );
  }
  return (
    <View style={styles.container}>
      {location ? (
        <>
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
            {feeders.map((feeder) => {
              return (
                <Marker
                  key={feeder.id}
                  icon={mapMarker}
                  coordinate={{
                    latitude: feeder.latitude,
                    longitude: feeder.longitude,
                  }}
                >
                  <Callout
                    onPress={() => handleLinkingToGoogleMaps(feeder)}
                    tooltip={true}
                  >
                    <View style={styles.PopUpContainer}>
                      <Svg width={180} height={120} viewBox="0 0 180 120">
                        <ImageSvg
                          width={"100%"}
                          height={"100%"}
                          href={{ uri: feeder.image.url }}
                          preserveAspectRatio="xMinYMin slice"
                        />
                      </Svg>
                      <Text style={styles.TextPopUp}> Ver rotas</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
          <View style={styles.createFeeder}>
            <Text style={styles.textCreateFeeder}>
              {feeders.length} comedouros encontrados
            </Text>
            <RectButton
              style={styles.createFeederButton}
              onPress={handleNavigateToCreateFeeder}
            >
              <Feather name="plus" color="#FFFF" size={20} />
            </RectButton>
          </View>
        </>
      ) : (
        <SvgComponent />
      )}
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
    width: 180,
    backgroundColor: "#D4E4ED",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  TextPopUp: {
    fontSize: 18,
    padding: 10,
    color: "#219EBC",
    fontFamily: "MPLUSRounded1c_800ExtraBold",
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
    color: "#8FA7B2",
    fontFamily: "MPLUSRounded1c_800ExtraBold",
  },
  createFeederButton: {
    width: "3rem",
    height: "3rem",
    backgroundColor: "#219EBC",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
