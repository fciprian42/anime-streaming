import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import CustomText from "@components/CustomText";
import ProgressiveImage from "@components/ProgressiveImage";

import { Anime } from "@interfaces/anime";
import { useTheme, useThemedStyles } from "@hooks/index";

import { ContextProps } from "@themes/index";

interface Props extends Anime {
  index: number;
  withOrder: boolean;
  type?: "list" | "flat";
  episodeIndicator?: number;

  onSelectAnime: () => void;
}

const ITEM_WIDTH = 150;
const ITEM_HEIGHT = 200;

const AnimePoster: React.FC<Props> = React.memo((props) => {
  const {
    rating,
    image,
    index,
    withOrder,
    onSelectAnime,
    type = "list",
    episodeIndicator,
  } = props;

  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  return (
    <Pressable
      onPress={onSelectAnime}
      style={[
        style.item,
        type === "flat"
          ? { width: "100%", marginEnd: 0 }
          : { width: ITEM_WIDTH, marginEnd: 8 },
      ]}
    >
      <LinearGradient
        style={{
          position: "absolute",
          zIndex: 10,
          height: "100%",
          width: "100%",
        }}
        colors={[`rgba(${colors.backdrop}, 0)`, `rgba(${colors.backdrop}, 0.3)`]}
      />
      {rating && (
        <View style={style.rating}>
          <CustomText type="h6" color="text" content={((rating / 100) * 10).toFixed(1)} />
        </View>
      )}
      <ProgressiveImage
        uri={image}
        height={ITEM_HEIGHT}
        borderRadius={12}
        style={style.cover}
      />
      {withOrder && (
        <CustomText
          type="h1"
          style={style.position}
          color="text"
          content={index.toString()}
        />
      )}
      {episodeIndicator && (
        <View style={style.position}>
          <CustomText type="h6" color="text" content={`Episode ${episodeIndicator}`} />
        </View>
      )}
    </Pressable>
  );
});

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    item: {
      height: ITEM_HEIGHT,
      borderRadius: 12,
      backgroundColor: theme.colors.input,
      position: "relative",
    },
    rating: {
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 6,
      position: "absolute",
      top: 12,
      left: 12,
      zIndex: 1,
    },
    cover: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.colors.input,
      borderRadius: 12,
    },
    position: {
      position: "absolute",
      bottom: 12,
      left: 12,
      zIndex: 10,
    },
  });

export default AnimePoster;
