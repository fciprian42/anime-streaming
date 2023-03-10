import React from "react";
import { StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "react-query";

import Screen from "@components/Screen";

import { useThemedStyles } from "@hooks/index";
import { getMostPopularAnime } from "@services/api";

import { ContextProps } from "@themes/index";

import BestAnime from "./BestAnime";
import Category from "./Category";

const Home: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const style = useThemedStyles(styles);

  const { isLoading, data: bestPopularAnime } = useQuery({
    queryKey: ["bestPopularAnime"],
    queryFn: getMostPopularAnime,
    staleTime: 60 * 60 * 10000,
    refetchInterval: 60 * 60 * 10000,
  });

  return (
    <Screen preset="scroll" contentContainerStyle={style.container}>
      <View style={[style.header, { top }]}></View>
      <BestAnime isLoading={isLoading} {...bestPopularAnime} />
      <View style={style.categories}>
        <Category
          title="Top Hits Anime"
          category="popular"
          categoryKey="bestPopularAnimes"
          withOrder
        />
        <Category
          title="Trending Anime"
          category="trending"
          categoryKey="trendingAnimes"
        />
        <Category
          title="New Episode Releases"
          category="recent-episodes"
          categoryKey="recentEpisodesAnimes"
          params={{ perPage: 10 }}
        />
      </View>
    </Screen>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      position: "relative",
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-end",
      position: "absolute",
      left: 24,
      right: 24,
      zIndex: 1,
    },
    categories: {
      flex: 1,
      padding: 24,
      paddingBottom: 100,
    },
    category: {
      alignItems: "center",
      justifyContent: "space-between",
    },
    categoryHeader: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
      marginBottom: 24,
    },
  });

export default Home;
