import React, { useEffect, useRef } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import FastImage from "react-native-fast-image";
import { LinearGradient } from "expo-linear-gradient";

import CustomText from "@components/CustomText";

import { Episode } from "@interfaces/anime";
import { useTheme } from "@hooks/index";

interface Props {
  episodes: Episode[] | undefined;
}

const MEDIA_HEIGHT = 150;
const MEDIA_WIDTH = 110;

const ListItem: React.FC<Episode> = React.memo((props) => {
  const { image, number } = props;

  const { colors } = useTheme();

  return (
    <Pressable style={styles.itemList}>
      <LinearGradient
        style={styles.itemLinear}
        colors={[`rgba(${colors.backdrop}, 0)`, `rgba(${colors.backdrop}, 0.4)`]}
      />
      <FastImage
        style={styles.play}
        resizeMode="cover"
        source={require("@assets/icons/play.png")}
      />
      <FastImage
        style={[styles.itemCover, { backgroundColor: colors.input }]}
        source={{ uri: image }}
      />
      <CustomText
        style={styles.itemLabel}
        color="text"
        type="h6"
        content={`Episode ${number}`}
      />
    </Pressable>
  );
});

const AnimeEpisodesList: React.FC<Props> = (props) => {
  const { episodes } = props;

  return (
    <View style={styles.container}>
      <CustomText type="h4" color="text" content="Episodes" />
      <FlatList
        data={episodes}
        contentContainerStyle={styles.containerList}
        horizontal
        renderItem={({ item }) => {
          return <ListItem {...item} />;
        }}
        keyExtractor={(item, _) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginVertical: 24,
  },
  containerList: {
    marginTop: 20,
    marginHorizontal: -8,
  },
  itemList: {
    marginHorizontal: 8,
    width: MEDIA_HEIGHT,
    height: MEDIA_WIDTH,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  itemCover: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  play: {
    position: "absolute",
    height: 32,
    width: 32,
    zIndex: 2,
  },
  itemLabel: {
    position: "absolute",
    left: 12,
    bottom: 12,
    zIndex: 20,
  },
  itemLinear: {
    position: "absolute",
    zIndex: 10,
    height: "100%",
    width: "100%",
  },
});

export default AnimeEpisodesList;
