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
  back?: boolean;
}

const PageHeader = ({ title, subtitle, image, back }: PageHeaderProps) => {
  const navigation = useNavigation();

  function handleGoback() {
    navigation.goBack();
  }

  function handleGobackToHomePage() {
    navigation.navigate("FeedersMap" as never);
  }
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoback}>
          <Image source={backIcon} resizeMode="contain" />
        </BorderlessButton>
        {back && (
          <BorderlessButton onPress={handleGobackToHomePage}>
            <Feather name="x" size={22} color="#F25050" resizeMode="contain" />
          </BorderlessButton>
        )}
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
    paddingVertical: "1.5rem",
    backgroundColor: "#77A7C2",
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    width: "92%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "MPLUSRounded1c_700Bold",
    color: "#ffff",
    fontSize: "1.3rem",
    lineHeight: "1.8rem",
  },
  subtitle: {
    marginTop: ".2rem",
    fontSize: ".9rem",
    fontFamily: "MPLUSRounded1c_500Medium",
    color: "#FFFFFF",
    opacity: 0.8,
  },
  content: {
    marginTop: ".8rem",
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
