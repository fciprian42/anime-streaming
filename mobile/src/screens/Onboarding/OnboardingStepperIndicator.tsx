import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme, useThemedStyles } from "@hooks/index";

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { ContextProps } from "@themes/index";

interface Props {
  activeIndex: number;
  totalSlides: number;
}

interface IndicatorProps {
  isActive: boolean;
}

const INDICATOR_WIDTH = 8;
const INDICATOR_WIDTH_ACTIVE = 32;
const INDICATOR_HEIGHT = 8;
const INDICATOR_COLOR = "#E0E0E0";

const StepperIndicator: React.FC<IndicatorProps> = React.memo((props) => {
  const {
    colors: { primary },
  } = useTheme();

  const style = useThemedStyles(styles);

  const { isActive } = props;

  const progress = useDerivedValue(() => {
    return withTiming(isActive ? 1 : 0);
  }, [isActive]);

  const width = useDerivedValue(() => {
    return isActive ? INDICATOR_WIDTH_ACTIVE : INDICATOR_WIDTH;
  }, [isActive]);

  const indicatorInterpolate = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [INDICATOR_COLOR, primary]
    );

    return {
      backgroundColor,
      width: withSpring(width.value),
    };
  });

  return <Animated.View style={[style.indicator, indicatorInterpolate]} />;
});

const OnboardingStepperIndicator: React.FC<Props> = (props) => {
  const { totalSlides, activeIndex } = props;
  const style = useThemedStyles(styles);

  if (totalSlides <= 0) return null;

  return (
    <View style={style.stepper}>
      {[...Array(totalSlides)].map((_, index) => {
        return <StepperIndicator isActive={index === activeIndex} key={index} />;
      })}
    </View>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    stepper: {
      flexDirection: "row",
      marginBottom: theme.spacing.large,
    },
    indicator: {
      borderRadius: theme.borders.radius.circle,
      height: INDICATOR_HEIGHT,
      width: INDICATOR_WIDTH,
      marginHorizontal: INDICATOR_WIDTH / 2,
      backgroundColor: INDICATOR_COLOR,
    },
  });

export default OnboardingStepperIndicator;
