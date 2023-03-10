import React from "react";
import { StyleSheet } from "react-native";

import FastImage from "react-native-fast-image";

import { Mask } from "@interfaces/mask";

import { border } from "@themes/index";

const MASK_HEIGHT = 267;
const MASK_WIDTH = 200;

const OnboardingMask: React.FC<Mask> = React.memo((props) => {
  const { image } = props;

  return <FastImage source={image} style={styles.mask} />;
});

const styles = StyleSheet.create({
  mask: {
    width: MASK_WIDTH,
    height: MASK_HEIGHT,
    borderRadius: border.radius.large,
    marginVertical: 10,
  },
});

export default OnboardingMask;
