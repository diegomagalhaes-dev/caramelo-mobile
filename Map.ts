import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const MapContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;

  & .map {
    width: ${Dimensions.get("window").width};
    height: ${Dimensions.get("window").height};
  }
`;

export const PopUpContainer = styled.View`
  width: 120px;
  height: 140px;
  border-radius: 20px;
  color: #ffff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
