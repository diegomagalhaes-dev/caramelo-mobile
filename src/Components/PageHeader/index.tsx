import React from "react";
import { View, Text, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import EStyleSheet from "react-native-extended-stylesheet";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import backIcon from "../../images/arrowBack.png";
import { ImageSourcePropType } from "react-native";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: ImageSourcePropType;
}

const PageHeader = ({ title, subtitle, image }: PageHeaderProps) => {
  const navigation = useNavigation();

  function handleGoback() {
    navigation.goBack();
  }

  function handleGobackToHomePage() {
    navigation.navigate("FeedersMap");
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoback}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        <BorderlessButton onPress={handleGobackToHomePage}>
          <Feather name="x" size={22} color="#F56160" resizeMode="contain" />
        </BorderlessButton>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

export default PageHeader;

const styles = EStyleSheet.create({
  container: {
    paddingVertical: "1.2rem",
    paddingHorizontal: "1.5rem",
    backgroundColor: "#77A7C2",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "MPLUSRounded1c_700Bold",
    color: "#ffff",
    fontSize: "1.4rem",
    lineHeight: "1.5rem",
  },
  subtitle: {
    marginTop: ".2rem",
    fontSize: ".9rem",
    fontFamily: "MPLUSRounded1c_500Medium",
    color: "rgba(255, 255, 255,0.6)",
  },
  content: {
    marginTop: ".8rem",
    maxWidth: "95%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
