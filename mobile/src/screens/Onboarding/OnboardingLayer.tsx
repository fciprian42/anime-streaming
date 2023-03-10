import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  ScrollViewProps,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

import { Mask } from "@interfaces/mask";
import OnboardingMask from "./OnboardingMask";

interface Props {
  masks: Mask[];
  scrollToIndex: number;
  style?: StyleProp<ViewStyle>;
}

const { height } = Dimensions.get("screen");

const ROTATION_LAYER = 12;
const MASK_HEIGHT = 267;

const OnboardingLayer: React.FC<Props> = (props) => {
  const { masks, style, scrollToIndex } = props;

  const [moviesCoords, setMoviesCoords] = useState<number[]>([]);

  const offsetY = useSharedValue<number>(0);

  const animatedProps = useAnimatedProps<ScrollViewProps>(() => {
    return {
      contentOffset: {
        x: 0,
        y: offsetY.value,
      },
    };
  });

  const scrollToPoint = useCallback(
    (point: number) => {
      if (scrollToIndex <= Object.keys(moviesCoords).length) {
        offsetY.value = withTiming((point * MASK_HEIGHT) / 2, {
          duration: 1000,
        });
      }
    },
    [moviesCoords]
  );

  useEffect(() => {
    scrollToPoint(scrollToIndex);
  }, [scrollToIndex]);

  return (
    <Animated.ScrollView
      animatedProps={animatedProps}
      scrollEnabled={false}
      style={[styles.layer, style]}
    >
      {masks && masks.length > 0
        ? masks.map((mask, index) => {
            return (
              <View
                  key={index}
                onLayout={(event) => {
                  const layout = event.nativeEvent.layout;
                  setMoviesCoords((prev) => ({
                    ...prev,
                    [index]: layout.y,
                  }));
                }}
              >
                <OnboardingMask key={index} image={mask} />
              </View>
            );
          })
        : null}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  layer: {
    flex: 1,
    height: height + 100,
    transform: [{ rotate: `${ROTATION_LAYER}deg` }],
  },
});

export default OnboardingLayer;
