import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import PageHeader from "../../Components/PageHeader";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import api from "../../services/api";

interface FeederDataParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const FeederData = () => {
  const [image, setImage] = useState("");
  const route = useRoute();

  const navigation = useNavigation();

  const params = route.params as FeederDataParams;

  async function handleCreateFeeder() {
    const { latitude, longitude } = params.position;
    console.log({
      latitude,
      longitude,
    });
    const data = new FormData();

    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("image", {
      name: `image_${Date.now()}.jpg`,
      type: "image/jpg",
      uri: image,
    } as any);

    await api.post("comedouros", data);
    navigation.navigate("FeedersMap" as any);
  }

  async function handleSelectImagesCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert(
        "É ideal que você escolha uma imagem para representar o comedouro! :)"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }
    const { uri: image } = result;
    setImage(image);
  }

  async function handleSelectImagesGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert(
        "É ideal que você escolha uma imagem para representar o comedouro! :)"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }
    const { uri: image } = result;
    setImage(image);
  }
  return (
    <View style={styles.container}>
      <PageHeader title="Agora, escolha uma imagem para o comedouro!" back />
      {image !== "" ? (
        <View style={styles.uploadedContainer}>
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.uploadedImage}
          />
        </View>
      ) : (
        <View style={styles.uploadedContainer}>
          <View
            style={{
              ...styles.uploadedImage,
              borderColor: "#77A7C2",
              borderWidth: 2,
              borderStyle: "dotted",
            }}
          >
            <MaterialCommunityIcons name="dog" size={42} color="#F8961E" />
          </View>
        </View>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.content}
          onPress={handleSelectImagesCamera}
        >
          <Feather name="camera" size={22} color="#ffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.content}
          onPress={handleSelectImagesGallery}
        >
          <FontAwesome5 name="images" size={22} color="#ffff" />
        </TouchableOpacity>
      </View>
      <RectButton style={styles.nextButton} onPress={handleCreateFeeder}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </View>
  );
};

export default FeederData;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF2F5'
  },
  content: {
    backgroundColor: "#219EBC",
    borderRadius: 20,
    paddingHorizontal: "4rem",
    paddingVertical: "1rem",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  text: {
    fontSize: "1rem",
    fontFamily: "MPLUSRounded1c_500Medium",
    color: "#023047",
  },

  nextButton: {
    backgroundColor: "#219EBC",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "3.5rem",
    marginHorizontal: "1.5rem",
  },

  nextButtonText: {
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 16,
    color: "#FFF",
  },

  uploadedContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "1.6rem",
    marginBottom: 32,
  },

  uploadedImage: {
    marginTop: "1rem",
    width: "98%",
    height: "10rem",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    paddingHorizontal: "1.6rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
