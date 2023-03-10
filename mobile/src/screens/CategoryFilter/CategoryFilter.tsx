import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "@components/Screen";
import Header from "@components/Header";
import AnimePoster from "@components/AnimePoster";
import CustomText from "@components/CustomText";
import Button from "@components/Button";

import { ScreenNavigationProp, ScreenRouteProp } from "@interfaces/router";
import { Anime } from "@interfaces/anime";

import { useFetchCategory } from "@services/api";
import { Plus } from "@assets/svg/icons";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@hooks/index";

interface Props {
  route: ScreenRouteProp<"CategoryFilter">;
  navigation: ScreenNavigationProp<"CategoryFilter">;
}

interface ListItemProps extends Anime {
  index: number;
  withOrder: boolean;

  onSelectAnime: () => void;
}

const POSTER_HEIGHT = 200;
const FLAT_WIDTH = 185;

const ListItem: React.FC<ListItemProps> = React.memo((props) => {
  return (
    <View style={styles.itemContainer}>
      <AnimePoster type="list" {...props} />
      <View style={styles.infos}>
        <CustomText
          align="left"
          color="text"
          isBold
          type="h5"
          content={props.title?.english}
        />
        <CustomText
          align="left"
          color="text"
          style={{ marginVertical: 16 }}
          type="h6"
          content={`${props.releaseDate} | ${props.totalEpisodes} episodes`}
        />
        <CustomText
          type="h6"
          style={{ marginBottom: 8 }}
          content={
            props.genres &&
            props.genres.length > 0 &&
            props.genres.map((genre, index) => {
              return (
                <CustomText
                  color="text"
                  type="h6"
                  align="left"
                  content={`${index !== 0 ? ", " : "Genre: "}${genre}${
                    index === props.genres.length - 1 ? "..." : ""
                  }`}
                />
              );
            })
          }
        />
        <Button
          type="pressable"
          icon={<Plus />}
          buttonStyles={styles.buttonList}
          theme="primary"
          content="My List"
        />
      </View>
    </View>
  );
});

const CategoryFilter: React.FC<Props> = ({ navigation, route }) => {
  const { title, category, type = "list" } = route.params;

  const [results, setResults] = useState<Anime[]>();

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFetchCategory(category);

  const { colors } = useTheme();

  const handleBack = () => navigation.goBack();

  const loadNext = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  const goToAnime = useCallback((id: string) => {
    navigation.navigate("Anime", { id });
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      const flattenData: Anime[] =
        data && data.pages.flatMap((page) => page.data.results);

      if (flattenData) {
        setResults(flattenData);
      }
    }
  }, [data, isLoading, isFetchingNextPage]);

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header icon="back" title={title} searching onPress={handleBack} />
      {!isLoading ? (
        <FlatList
          data={results}
          numColumns={type === "list" ? 1 : 2}
          renderItem={({ item, index }) => {
            if (type === "list") {
              return (
                <ListItem
                  withOrder
                  index={index + 1}
                  onSelectAnime={() => goToAnime(item.id)}
                  {...item}
                />
              );
            } else {
              return (
                <View
                  style={[
                    styles.itemContainer,
                    {
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginStart: 10,
                    },
                  ]}
                >
                  <AnimePoster
                    withOrder={false}
                    index={index + 1}
                    episodeIndicator={item.episodeNumber}
                    type="flat"
                    onSelectAnime={() => goToAnime(item.id)}
                    {...item}
                  />
                </View>
              );
            }
          }}
          onEndReached={loadNext}
          contentContainerStyle={{ paddingBottom: 50 }}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : null
          }
          keyExtractor={(item) => `anime-${item.id}`}
        />
      ) : (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" color={colors.text} />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  infos: {
    paddingVertical: 9,
    paddingStart: 12,
    maxHeight: POSTER_HEIGHT,
    flexShrink: 1,
    alignItems: "flex-start",
    justifyContent: "space-around",
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 100,
    maxWidth: 120,
    marginTop: 16,
  },
});

export default CategoryFilter;
