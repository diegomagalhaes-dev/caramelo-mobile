import React, { useState } from "react";
import { Text, TextPropTypes, View } from "react-native";
import PageHeader from "../../Components/PageHeader";
import { Feather } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";
import { useRoute } from "@react-navigation/native";
import { RectButton, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

interface FeederDataParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const FeederData = () => {
  const [image, setImage] = useState("");
  const route = useRoute();

  const params = route.params as FeederDataParams;

  function handleCreateFeeder() {
    const { latitude, longitude } = params.position;
    console.log({
      latitude,
      longitude,
    });
  }

  async function handleSelectImages() {
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

    console.log(result);
  }

  return (
    <View>
      <PageHeader title="Escolha uma imagem para o comedouro!" />
      <TouchableOpacity style={styles.content} onPress={handleSelectImages}>
        <Feather name="upload" size={22} color="#F8961E" />
        <Text style={styles.text}>Selecione uma imagem!</Text>
      </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderStyle: "dashed",
    borderColor: "#96D2F0",
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
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
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: "MPLUSRounded1c_700Bold",
    fontSize: 16,
    color: "#FFF",
  },
});
