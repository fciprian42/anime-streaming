import React, { useMemo, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import CustomText from "@components/CustomText";
import Button from "@components/Button";

import { ContextProps } from "@themes/index";
import { useTheme, useThemedStyles } from "@hooks/index";

import OnboardingStepperIndicator from "./OnboardingStepperIndicator";

const { width } = Dimensions.get("screen");

interface Props {
  onStarted: () => void;
}

const SlideContent: React.FC<{ text: string }> = React.memo(({ text }) => {
  return (
    <CustomText
      type="h5"
      color="text"
      content={text}
      style={{ textAlign: "center", marginBottom: 24 }}
    />
  );
});

const OnboardingStepper: React.FC<Props> = (props) => {
  const { onStarted } = props;

  const { colors, spacing } = useTheme();
  const style = useThemedStyles(styles);

  const { bottom } = useSafeAreaInsets();

  const [index, setIndex] = useState<number>(0);

  const slides = useMemo(
    () => [
      "The best movie streaming app of the century to make your days great !",
      "The best movie streaming app of the century to make your days great !",
      "The best movie streaming app of the century to make your days great !",
    ],
    []
  );

  const position = useDerivedValue(() => {
    return index === 0 ? width : index === 1 ? -width / width : -width;
  }, [index]);

  const sliderInterpolate = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(position.value, {
            duration: 500,
          }),
        },
      ],
    }),
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        setIndex((index) => index + 1);
      }, 5000);

      return () => clearInterval(interval);
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (index === slides.length) {
        setIndex(0);
      }
    }, [index])
  );

  return (
    <View style={style.container}>
      <View
        style={[style.stepper, { paddingBottom: !bottom ? spacing.large : bottom * 2 }]}
      >
        <CustomText
          color="text"
          type="h2"
          content="Welcome to Mova"
          style={{ marginBottom: spacing.large }}
        />
        <Animated.View style={[style.slider, sliderInterpolate]}>
          {slides && slides.length
            ? slides.map((slide, index) => {
                return (
                  <View key={`slide-${index}`} style={style.slide}>
                    <SlideContent key={index} text={slide} />
                  </View>
                );
              })
            : null}
        </Animated.View>
        <OnboardingStepperIndicator activeIndex={index} totalSlides={slides.length} />
        <Button
          type="pressable"
          theme="primary"
          buttonStyles={style.button}
          content="Get Started"
          onPress={onStarted}
          shadowConfig={{
            shadowColor: colors.primary,
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowRadius: 24,
            shadowOpacity: 0.25,
          }}
        />
      </View>
    </View>
  );
};

export const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    stepper: {
      width,
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: theme.spacing.large,
      flex: 1,
    },
    slider: {
      position: "relative",
      flexDirection: "row",
    },
    slide: {
      width,
    },
    button: {
      borderRadius: theme.borders.radius.large,
      padding: 18,
      width: "100%",
    },
  });

export default OnboardingStepper;
