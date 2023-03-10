import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import FirebaseImage from "@components/FirebaseImage";

import { useAppDispatch, useTheme, useThemedStyles } from "@hooks/index";
import { setBannerUser } from "@services/slices/session.slice";

import { ContextProps } from "themes";

interface Props {
  toggleOpen: () => void;
}

const BANNER_SIZE = 150;

const OnboardingProfilePictures: React.FC<Props> = (props) => {
  const dispach = useAppDispatch();

  const { toggleOpen } = props;
  const { colors } = useTheme();

  const sheetRef = useRef<BottomSheet>(null);
  const style = useThemedStyles(styles);

  const [bannersURL, setBannersURL] = useState<string[]>([]);

  const banners = useMemo(
    () => [
      "demon-slayer",
      "angel-chainsaw-man",
      "itachi",
      "makima",
      "honkai-impact",
      "naruto",
      "denji",
      "jujutsu-kaisen",
    ],
    []
  );

  const snapPoints = useMemo(() => ["70%"], []);

  const updateUserPicture = (selectedPicture: string) => {
    if (bannersURL && bannersURL.length > 0) {
      for (let i = 0; i < banners.length; i++) {
        if (bannersURL[i].includes(selectedPicture)) {
          dispach(setBannerUser(bannersURL[i]));

          sheetRef.current?.close();
          break;
        }
      }
    }
  };

  const addDownloadedFile = useCallback(
    (url: string) => {
      setBannersURL((prev) => [...prev, url]);
    },
    [bannersURL]
  );

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  return (
    <BottomSheet
      enablePanDownToClose
      index={0}
      ref={sheetRef}
      handleIndicatorStyle={{ backgroundColor: colors.textBody }}
      backgroundStyle={{ backgroundColor: colors.background }}
      handleStyle={style.handle}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onClose={toggleOpen}
    >
      <BottomSheetFlatList
        data={banners}
        keyExtractor={(_, index) => `banner-${index}`}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => updateUserPicture(item)}>
              <FirebaseImage
                onDownload={(url: string) => addDownloadedFile(url)}
                name={item}
                container="banners"
                style={style.itemContainer}
              />
            </Pressable>
          );
        }}
        contentContainerStyle={style.contentContainer}
      />
    </BottomSheet>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    contentContainer: {
      backgroundColor: theme.colors.background,
      paddingBottom: BANNER_SIZE / 2,
    },
    itemContainer: {
      margin: theme.spacing.regular,
      height: BANNER_SIZE,
      borderRadius: theme.borders.radius.medium,
      backgroundColor: theme.colors.border,
    },
    handle: {
      backgroundColor: theme.colors.background,
      borderTopStartRadius: theme.borders.radius.large,
      borderTopEndRadius: theme.borders.radius.large,
    },
    footerContainer: {
      padding: 12,
      marginHorizontal: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: {
        width: 4,
        height: 8,
      },
      shadowRadius: 24,
      shadowOpacity: 0.25,
    },
  });

export default OnboardingProfilePictures;
