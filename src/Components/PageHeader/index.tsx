import React from "react";
import { View, Text, Image } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import EStyleSheet from "react-native-extended-stylesheet";
import { Octicons, FontAwesome } from "@expo/vector-icons";
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
        <BorderlessButton rippleColor="#219EBC" onPress={handleGoback}>
          <FontAwesome
            name="angle-left"
            size={26}
            color="rgba(255,255,255, .7)"
          />
        </BorderlessButton>
        {back && (
          <BorderlessButton
            rippleColor="#219EBC"
            onPress={handleGobackToHomePage}
          >
            <Octicons name="x" size={20} color="rgba(255,255,255, .7)" />
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
    paddingVertical: "2rem",
    alignItems: "center",
    backgroundColor: "#7FBFDD",
  },
  topBar: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "MPLUSRounded1c_800ExtraBold",
    color: "#ffff",
    fontSize: "1.25rem",
    lineHeight: "1.8rem",
  },
  subtitle: {
    marginTop: ".2rem",
    fontSize: "1rem",
    fontFamily: "MPLUSRounded1c_500Medium",
    color: "#FFFFFF",
    opacity: 0.8,
    maxWidth: "15rem",
  },
  content: {
    marginTop: ".8rem",
    width: "90%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
