import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, View } from "react-native";

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import CustomText from "@components/CustomText";
import Screen from "@components/Screen";
import Button from "@components/Button";
import Icon from "@components/Icon";

import { ScreenNavigationProp } from "@interfaces/router";
import { Interesets, interesets } from "@interfaces/anime";

import { ContextProps } from "@themes/index";
import { useAppDispatch, useAppSelector, useTheme, useThemedStyles } from "@hooks/index";
import { setInteresets } from "@services/slices/session.slice";
import { RootState } from "@services/store";

interface Props {
  navigation: ScreenNavigationProp<"OnboardingInteresets">;
}

interface ItemProps {
  label: string;
  isSelected: boolean;

  addToInteresets: () => void;
}

const { width } = Dimensions.get("screen");

const ITEM_HEIGHT = 100;
const ITEM_WIDTH = 80;
const FLATLIST_COLUMNS = 3;
const ITEM_SPACING = 20;

const AnimatedItem = Animated.createAnimatedComponent(Pressable);

const OnboardingInteresetItem: React.FC<ItemProps> = (props) => {
  const { label, addToInteresets, isSelected } = props;

  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  const progress = useDerivedValue(() => {
    return withTiming(isSelected ? 1 : 0);
  }, [isSelected]);

  const stylesInterpolate = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.background, colors.primary]
    );

    return {
      backgroundColor,
    };
  });

  const textColorInterpolate = useAnimatedStyle(() => {
    const color = interpolateColor(progress.value, [0, 1], [colors.textBody, "#fff"]);

    return {
      color,
    };
  });

  return (
    <AnimatedItem onPress={addToInteresets} style={[style.listItem, stylesInterpolate]}>
      <Icon
        style={{ marginBottom: 6 }}
        icon={label.toLocaleLowerCase().replace(" ", "")}
        size={50}
      />
      <CustomText animated type="h6" style={textColorInterpolate} content={label} />
    </AnimatedItem>
  );
};

const OnboardingInteresets: React.FC<Props> = ({ navigation }) => {
  const userInteresets = useAppSelector(
    (state: RootState) => state.session.user.preferred_interesets
  );
  const dispatch = useAppDispatch();

  const { dark } = useTheme();
  const style = useThemedStyles(styles);

  const [selectedInteresets, setSelectedInteresets] =
    useState<Interesets[]>(userInteresets);

  const addToInteresets = useCallback(
    (value: Interesets) => {
      if (!selectedInteresets.includes(value)) {
        setSelectedInteresets([...selectedInteresets, value]);
      } else {
        const newInteresets = selectedInteresets.filter((item) => item !== value);

        setSelectedInteresets(newInteresets);
      }
    },
    [selectedInteresets]
  );

  const continueOnboarding = () => {
    dispatch(setInteresets(selectedInteresets));

    navigation.navigate("OnboardingProfile");
  };

  const skipOnboarding = () => {};

  return (
    <Screen
      contentContainerStyle={style.container}
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
    >
      <View style={style.header}>
        <CustomText
          color="textBody"
          type="h1"
          style={{ marginBottom: 6 }}
          content="Let Us Know!"
        />
        <CustomText
          color="textBody"
          type="h5"
          content="Choose your genre to find favorite titles here!"
        />
      </View>
      <FlatList
        data={interesets}
        numColumns={FLATLIST_COLUMNS}
        style={style.list}
        ListFooterComponentStyle={{ paddingBottom: 200 }}
        columnWrapperStyle={style.wrapperList}
        indicatorStyle={dark ? "white" : "black"}
        scrollIndicatorInsets={{ top: 0, left: 0, right: -3, bottom: 0 }}
        renderItem={({ item }) => {
          return (
            <OnboardingInteresetItem
              label={item}
              isSelected={selectedInteresets.includes(item)}
              addToInteresets={() => addToInteresets(item)}
            />
          );
        }}
        keyExtractor={(item, _) => `intereset-${item.toLowerCase()}`}
      />

      <View style={style.footer}>
        <Button
          type="pressable"
          theme="primary"
          buttonStyles={style.button}
          content="Continue"
          onPress={continueOnboarding}
        />
        <Button
          type="pressable"
          theme="transparent"
          color="textBody"
          buttonStyles={[style.button, { marginTop: 10 }]}
          content="Skip for now"
          onPress={skipOnboarding}
        />
      </View>
    </Screen>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 48,
      paddingBottom: 120,
      position: "relative",
    },
    header: {
      justifyContent: "center",
      alignItems: "center",
    },
    list: {
      marginTop: 20,
      paddingTop: 20,
      paddingBottom: 120,
    },
    wrapperList: {
      flexWrap: "nowrap",
      marginStart: -(ITEM_SPACING / 2) / 2,
    },
    listItem: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: ITEM_HEIGHT,
      width: ITEM_WIDTH,
      backgroundColor: theme.colors.background,
      borderRadius: theme.borders.radius.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginHorizontal: ITEM_SPACING / 2,
      marginBottom: 30,
    },
    footer: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 48,
      paddingTop: 20,
      width,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    button: {
      borderRadius: theme.borders.radius.large,
      backgroundColor: theme.colors.primary,
      width: "100%",
      padding: 12,
    },
  });

export default OnboardingInteresets;
