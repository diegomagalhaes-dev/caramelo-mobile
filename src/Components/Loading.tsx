import React, { useState, useEffect } from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Svg, { Path, G } from "react-native-svg";

interface svg {
  props?: any;
}

const SvgComponent = ({ props }: svg) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    function updateStep() {
      setStep((step) => {
        if (step < 3) return step + 1;
        else return 0;
      });
    }
    const interval = setInterval(updateStep, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function displayStep(i: number) {
    return step === i ? 1 : 0;
  }

  return (
    <View style={styles.container}>
      <Svg
        width={46}
        height={31}
        viewBox="0 0 46 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <G fillOpacity={displayStep(0)} fill="#F8961E">
          <Path
            d="M28.341 18a3 3 0 012.829 2 3 3 0 105.067-3 3 3 0 010-4 3 3 0 10-5.067-3 3 3 0 01-2.829 2H11.66a3 3 0 01-2.829-2 3 3 0 10-5.067 3 3 3 0 010 4 3 3 0 105.067 3 3 3 0 012.829-2H28.34zM11.66 21a6 6 0 11-10.13-6 6 6 0 1110.13-6H28.34a6 6 0 1110.13 6 6 6 0 11-10.13 6H11.66z"
            fill="#F8961E"
          />
        </G>
        <G fillOpacity={displayStep(1)} fill="#F8961E">
          <Path d="M39.468 16.527A6 6 0 1128.341 21H11.66a6 6 0 11-10.13-6 6 6 0 1110.13-6h15.459c.17 1.07.518 2.08 1.013 3H11.66a3 3 0 01-2.829-2 3 3 0 10-5.067 3 3 3 0 010 4 3 3 0 105.067 3 3 3 0 012.829-2H28.34a3 3 0 012.829 2 3 3 0 105.063-3.004 9.492 9.492 0 003.235-.47zM29.353 2.752a1.5 1.5 0 012.916-.706l.706 2.916a1.5 1.5 0 01-2.916.706l-.706-2.916zM38.174 3.064a1.5 1.5 0 112.56 1.563l-1.562 2.56a1.5 1.5 0 01-2.56-1.562l1.562-2.56zM43.737 9.044a1.5 1.5 0 11.706 2.916l-2.915.706a1.5 1.5 0 11-.706-2.916l2.915-.706z" />
        </G>
        <G fillOpacity={displayStep(2)} fill="#F8961E">
          <Path d="M22.013 21H11.659a6 6 0 11-10.13-6 6 6 0 1110.13-6h15.459c.17 1.07.518 2.08 1.013 3H11.66a3 3 0 01-2.829-2 3 3 0 10-5.067 3 3 3 0 010 4 3 3 0 105.067 3 3 3 0 012.829-2h11.007a9.455 9.455 0 00-.653 3zM34.26 13.207a1.5 1.5 0 111.112 2.786l-2.786 1.113a1.5 1.5 0 01-1.113-2.786l2.787-1.113zM35.203 21.983a1.5 1.5 0 01-1.184 2.757l-2.756-1.184a1.5 1.5 0 011.183-2.756l2.757 1.183zM30.073 28.339a1.5 1.5 0 11-2.786 1.113l-1.113-2.787a1.5 1.5 0 112.786-1.112l1.113 2.786z" />
        </G>
        <G fillOpacity={displayStep(3)} fill="#F8961E">
          <Path d="M9.713 11.284A2.995 2.995 0 018.83 10a3 3 0 10-5.067 3 3 3 0 010 4 3 3 0 105.067 3c.18-.51.49-.949.883-1.284a9.999 9.999 0 001.724 2.826A6 6 0 111.527 15a6 6 0 119.909-6.542 10 10 0 00-1.723 2.826zm17.44-2.075A8.962 8.962 0 0127.118 9H27c.051.069.102.138.152.209zM16.839 6.06a1.5 1.5 0 112.121 2.122l-2.121 2.121a1.5 1.5 0 11-2.121-2.121l2.121-2.121zM21.167 13.753a1.5 1.5 0 110 3h-3a1.5 1.5 0 110-3h3zM18.96 21.617a1.5 1.5 0 11-2.121 2.121l-2.121-2.121a1.5 1.5 0 112.121-2.121l2.121 2.121z" />
        </G>
      </Svg>
    </View>
  );
};

export default SvgComponent;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#EBF2F5",
    alignItems: "center",
    justifyContent: "center",
  },
});
