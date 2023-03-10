import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import CustomText from "@components/CustomText";
import Button from "@components/Button";
import ProgressiveImage from "@components/ProgressiveImage";

import { Anime } from "@interfaces/anime";

import { useTheme } from "@hooks/index";
import { LinearGradient } from "expo-linear-gradient";
import { Play, Plus } from "@assets/svg/icons";

import { hitSlops } from "@themes/index";
import { removeWhiteSpaceAndHtmlTags } from "@functions/index";

interface Props extends Anime {
  isLoading: boolean;
}

const CANVAS_HEIGHT = 400;
const { width } = Dimensions.get("screen");

const BestAnime: React.FC<Props> = (props) => {
  const { image, title, genres, description } = props;
  const { colors } = useTheme();

  const [expand, setExpand] = useState<boolean>(false);

  const viewHeight = useSharedValue<number>(0);

  useEffect(() => {
    viewHeight.value = expand ? 100 : 0;
  }, [expand]);

  const interpolateHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(viewHeight.value, {
        duration: 500,
      }),
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.input }]}>
      <ProgressiveImage
        uri={image}
        height={CANVAS_HEIGHT}
        width={width}
        style={[styles.cover, { backgroundColor: colors.border }]}
      />
      <LinearGradient
        colors={[`rgba(${colors.backdrop}, 0)`, `rgba(${colors.backdrop}, 1)`]}
        style={styles.details}
      >
        {title && title.english && (
          <CustomText color="text" type="h2" content={title.english} align="left" />
        )}
        <Pressable
          onPress={() => setExpand(!expand)}
          hitSlop={hitSlops.medium}
          style={styles.genres}
        >
          {genres &&
            genres.length > 0 &&
            genres.map((genre, index) => {
              return (
                <CustomText
                    key={index}
                  color="text"
                  type="h6"
                  content={`${index !== 0 ? ", " : ""}${genre}${
                    index === genres.length - 1 ? "..." : ""
                  }`}
                />
              );
            })}
        </Pressable>
        {description && (
          <CustomText
            animated
            type="h6"
            numberOfLines={5}
            color="text"
            align="left"
            style={interpolateHeight}
            content={removeWhiteSpaceAndHtmlTags(description)}
          />
        )}
        <View style={styles.actions}>
          <Button
            icon={<Play />}
            buttonStyles={styles.button}
            theme="primary"
            type="pressable"
            content="Play"
          />
          <Button
            icon={<Plus />}
            buttonStyles={[styles.button, { borderWidth: 2, borderColor: "#fff" }]}
            theme="transparent"
            type="pressable"
            content="My list"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: CANVAS_HEIGHT,
  },
  cover: {
    height: "100%",
    width: "100%",
  },
  details: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  genres: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginEnd: 12,
    flexDirection: "row",
  },
});

export default BestAnime;
