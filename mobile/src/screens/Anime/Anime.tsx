import React, { useCallback, useState } from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";

import Button from "@components/Button";
import Screen from "@components/Screen";
import CustomText from "@components/CustomText";
import ProgressiveImage from "@components/ProgressiveImage";

import { getAnimeDetails, getAnimeEpisodes } from "@services/api";

import { ScreenNavigationProp, ScreenRouteProp } from "@interfaces/router";
import { useTheme, useThemedStyles } from "@hooks/index";

import { ContextProps, hitSlops } from "@themes/index";
import { removeWhiteSpaceAndHtmlTags } from "@functions/index";

import { ArrowRight, Back, Rating } from "@assets/svg/icons";
import AnimeEpisodesList from "./AnimeEpisodesList";

interface Props {
  route: ScreenRouteProp<"Anime">;
  navigation: ScreenNavigationProp<"Anime">;
}

const { width } = Dimensions.get("screen");

const Anime: React.FC<Props> = (props) => {
  const { route, navigation } = props;
  const { id } = route.params;

  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const style = useThemedStyles(styles);

  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = useCallback(() => {
    setTextShown(!textShown);
  }, [textShown]);

  const onTextLayout = useCallback((event) => {
    setLengthMore(event.nativeEvent.lines.length >= 4);
  }, []);

  const handleBack = () => navigation.goBack();

  const { isLoading, data } = useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeDetails(id),
    staleTime: 600 * 1000,
  });

  const { isLoading: fetchingEpisodes, data: episodes } = useQuery({
    queryKey: ["anime-episodes", id],
    queryFn: () => getAnimeEpisodes(id),
    staleTime: 600 * 1000,
  });

  return (
    <Screen preset="scroll">
      <View style={style.header}>
        <ProgressiveImage
          uri={data?.image}
          height={320}
          width={width}
          style={[style.coverImage, { backgroundColor: colors.border }]}
        />
        <Pressable
          onPress={handleBack}
          style={[style.back, { top }]}
          hitSlop={hitSlops.medium}
        >
          <Back />
        </Pressable>
      </View>
      <View style={style.container}>
        {data?.title?.english && (
          <CustomText
            style={{ width: "80%" }}
            numberOfLines={1}
            isBold
            color="text"
            align="left"
            type="h4"
            content={data?.title?.english}
          />
        )}
        <View style={style.informations}>
          {data?.rating ? (
            <View style={style.information}>
              <Rating fill={colors.primary} />
              <CustomText
                color="text"
                type="h6"
                style={{ marginHorizontal: 10 }}
                content={((data.rating / 100) * 10).toFixed(1)}
              />
              <ArrowRight fill={colors.primary} />
            </View>
          ) : null}
          {data?.releaseDate ? (
            <CustomText
              color="text"
              type="h6"
              style={{ marginHorizontal: 10 }}
              content={data.releaseDate.toString()}
            />
          ) : null}
        </View>
        <CustomText
          numberOfLines={1}
          type="h6"
          style={{ marginBottom: 8 }}
          content={
            data?.genres &&
            data?.genres.length > 0 &&
            data?.genres.map((genre, index) => {
              return (
                <CustomText
                  color="text"
                  type="h6"
                  align="left"
                  content={`${index !== 0 ? ", " : "Genre: "}${genre}${
                    index === data.genres.length - 1 ? "..." : ""
                  }`}
                />
              );
            })
          }
        />
        {data?.description && (
          <View>
            <CustomText
              color="text"
              type="h6"
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              align="justify"
              content={removeWhiteSpaceAndHtmlTags(data?.description)}
            />
            {lengthMore && (
              <Pressable onPress={toggleNumberOfLines} hitSlop={hitSlops.medium}>
                <CustomText align="left" color="primary" type="h6" content="View more" />
              </Pressable>
            )}
          </View>
        )}
        <AnimeEpisodesList episodes={episodes} />
      </View>
    </Screen>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    informations: {
      marginVertical: 24,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    information: {
      flexDirection: "row",
      alignItems: "center",
    },
    header: {
      position: "relative",
      height: 320,
      width: "100%",
    },
    coverImage: {
      height: "100%",
      width: "100%",
    },
    back: {
      position: "absolute",
      left: 24,
    },
  });

export default Anime;
