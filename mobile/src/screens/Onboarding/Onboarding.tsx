import React, { SetStateAction, useCallback, useMemo, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";

import { useTheme, useThemedStyles } from "@hooks/index";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";

import { ScreenNavigationProp } from "@interfaces/router";
import { useAppSelector } from "@hooks/index";
import { RootState } from "@services/store";

import OnboardingLayer from "./OnboardingLayer";
import OnboardingStepper from "./OnboardingStepper";
import { ContextProps } from "@themes/index";

const { height, width } = Dimensions.get("screen");

interface Props {
  navigation: ScreenNavigationProp<"Onboarding">;
}

const Onboarding: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  const session = useAppSelector((state: RootState) => state.session);
  const boarding = useAppSelector((state: RootState) => state.session.boarding);

  const { bottom } = useSafeAreaInsets();

  const [layerScrollLeft, setLayerScrollLeft] = useState<number>(0);
  const [layerScrollCenter, setLayerScrollCenter] = useState<number>(0);
  const [layerScrollRight, setLayerScrollRight] = useState<number>(0);

  const layerLeft = useMemo(
    () => [
      require("@assets/images/onboarding/animes/black-clover.webp"),
      require("@assets/images/onboarding/animes/my-hero-academia.webp"),
      require("@assets/images/onboarding/animes/re-zero.webp"),
      require("@assets/images/onboarding/animes/assasination-classroom.webp"),
      require("@assets/images/onboarding/animes/aot.webp"),
      require("@assets/images/onboarding/animes/chainsaw-man.webp"),
      require("@assets/images/onboarding/animes/aot-final.webp"),
    ],
    []
  );

  const layerCenter = useMemo(
    () => [
      require("@assets/images/onboarding/animes/demon-slayer.webp"),
      require("@assets/images/onboarding/animes/blue-lock.webp"),
      require("@assets/images/onboarding/animes/naruto.webp"),
      require("@assets/images/onboarding/animes/spy-x-family.webp"),
      require("@assets/images/onboarding/animes/jujutsu-kaisen.webp"),
      require("@assets/images/onboarding/animes/chainsaw-man.webp"),
      require("@assets/images/onboarding/animes/my-hero-academia.webp"),
    ],
    []
  );

  const layerRight = useMemo(
    () => [
      require("@assets/images/onboarding/animes/assasination-classroom.webp"),
      require("@assets/images/onboarding/animes/death-note.webp"),
      require("@assets/images/onboarding/animes/food-wars.webp"),
      require("@assets/images/onboarding/animes/tokyo-revengers.webp"),
      require("@assets/images/onboarding/animes/aot.webp"),
      require("@assets/images/onboarding/animes/chainsaw-man.webp"),
      require("@assets/images/onboarding/animes/aot-final.webp"),
    ],
    []
  );

  const onStart = () => {
    if (!session.token) {
      navigation.navigate("BottomTabs");
    } else if (session.token && !boarding) {
      navigation.navigate("OnboardingInteresets");
    }
  };

  const layerRamdonScroll = useCallback(
    (max: number, fn: React.Dispatch<SetStateAction<number>>) => {
      let tmpRandom = 0;
      let nextRamdom = 0;

      return setInterval(() => {
        tmpRandom = nextRamdom;
        nextRamdom = Math.floor(Math.random() * max);

        if (
          nextRamdom === tmpRandom + 1 ||
          nextRamdom === tmpRandom - 1 ||
          nextRamdom === tmpRandom
        ) {
          nextRamdom = Math.floor(Math.random() * max);
        }

        fn(nextRamdom);
      }, Math.random() * (max * 2500 - 2500) + 2500);
    },
    []
  );

  useFocusEffect(
    React.useCallback(() => {
      const layerIntervalLeft = layerRamdonScroll(
        layerLeft.length - 1,
        setLayerScrollLeft
      );
      const layerIntervalCenter = layerRamdonScroll(
        layerCenter.length - 1,
        setLayerScrollCenter
      );
      const layerIntervalRight = layerRamdonScroll(
        layerRight.length - 1,
        setLayerScrollRight
      );

      return () => {
        clearInterval(layerIntervalLeft);
        clearInterval(layerIntervalCenter);
        clearInterval(layerIntervalRight);
      };
    }, [])
  );

  return (
    <View style={[style.container]}>
      <View style={style.layers}>
        <OnboardingLayer masks={layerLeft} scrollToIndex={layerScrollLeft} />
        <OnboardingLayer masks={layerCenter} scrollToIndex={layerScrollCenter} />
        <OnboardingLayer masks={layerRight} scrollToIndex={layerScrollRight} />
      </View>
      <LinearGradient
        colors={[`rgba(${colors.backdrop}, 0)`, `rgba(${colors.backdrop}, 1)`]}
        style={[style.content, { bottom: 0 - bottom }]}
      >
        <OnboardingStepper onStarted={onStart} />
      </LinearGradient>
    </View>
  );
};

export const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
      backgroundColor: theme.colors.background,
    },
    layers: {
      flex: 1,
      flexDirection: "row",
      marginTop: -40,
      height,
      width: width + 280,
      left: -180,
    },
    content: {
      position: "absolute",
      flexDirection: "column",
      flex: 1,
      zIndex: 2,
      width,
      height: height * 0.7,
    },
  });

export default Onboarding;
