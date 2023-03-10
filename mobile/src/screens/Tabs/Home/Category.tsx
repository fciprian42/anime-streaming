import React, { useCallback } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { useQuery } from "react-query";
import { useNavigation } from "@react-navigation/native";

import CustomText from "@components/CustomText";
import AnimePoster from "@components/AnimePoster";

import { useThemedStyles } from "@hooks/index";
import { ContextProps, hitSlops } from "@themes/index";
import { getCategoryAnimes } from "@services/api";

interface Props {
  title: string;
  category: string;
  categoryKey: string;
  withOrder?: boolean;
  params?: any;
}

const Category: React.FC<Props> = (props) => {
  const { title, category, categoryKey, withOrder = false, params = {} } = props;

  const navigation = useNavigation();
  const style = useThemedStyles(styles);

  const { isLoading, data } = useQuery({
    queryKey: [categoryKey],
    queryFn: () => getCategoryAnimes(category, params),
    staleTime: 60 * 60 * 10000,
    refetchInterval: 60 * 60 * 10000,
  });

  const goToAnime = useCallback((id: string) => {
    navigation.navigate("Anime", { id });
  }, []);

  const goToCategory = useCallback(() => {
    navigation.navigate("CategoryFilter", {
      category,
      title,
      type: category === "recent-episodes" ? "flat" : "list",
    });
  }, [category]);

  return (
    <View style={style.category}>
      <View style={style.categoryHeader}>
        <CustomText type="h4" color="text" content={title} />
        <Pressable onPress={goToCategory} hitSlop={hitSlops.medium}>
          <CustomText type="h5" color="primary" content="See all" />
        </Pressable>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <AnimePoster
              onSelectAnime={() => goToAnime(item.id)}
              withOrder={withOrder}
              index={index + 1}
              {...item}
            />
          );
        }}
        keyExtractor={(item, _) => `anime-popular-${item.id}`}
      />
    </View>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    category: {
      marginBottom: 24,
      height: 250,
    },
    categoryHeader: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      width: "100%",
      marginBottom: 24,
    },
  });

export default Category;
