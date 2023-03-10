import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import FirebaseImage from "@components/FirebaseImage";

import { useAppDispatch, useTheme, useThemedStyles } from "@hooks/index";
import { setAvatarUser } from "@services/slices/session.slice";

import { ContextProps } from "themes";

interface Props {
  toggleOpen: () => void;
}

const AVATAR_SIZE = 100;

const OnboardingProfileAvatar: React.FC<Props> = (props) => {
  const dispach = useAppDispatch();

  const { toggleOpen } = props;
  const { colors } = useTheme();

  const sheetRef = useRef<BottomSheet>(null);
  const style = useThemedStyles(styles);

  const [avatarsURL, setAvatarsURL] = useState<string[]>([]);

  const avatars = useMemo(
    () => [
      "girl-1",
      "girl-2",
      "girl-3",
      "girl-4",
      "girl-5",
      "girl-6",
      "girl-7",
      "girl-8",
      "girl-9",
      "boy-1",
      "boy-2",
      "boy-3",
      "boy-4",
      "boy-5",
      "boy-6",
      "boy-7",
      "boy-8",
      "boy-9",
    ],
    []
  );

  const snapPoints = useMemo(() => ["70%"], []);

  const updateUserPicture = (selectedPicture: string) => {
    if (avatarsURL && avatarsURL.length > 0) {
      for (let i = 0; i < avatars.length; i++) {
        if (avatarsURL[i].includes(selectedPicture)) {
          dispach(setAvatarUser(avatarsURL[i]));

          sheetRef.current?.close();
          break;
        }
      }
    }
  };

  const addDownloadedFile = useCallback(
    (url: string) => {
      setAvatarsURL((prev) => [...prev, url]);
    },
    [avatarsURL]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
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
        data={avatars}
        keyExtractor={(_, index) => `banner-${index}`}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => updateUserPicture(item)}>
              <FirebaseImage
                onDownload={(url: string) => addDownloadedFile(url)}
                container="avatars"
                name={item}
                style={style.avatarContainer}
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
      paddingBottom: AVATAR_SIZE / 2,
    },
    itemContainer: {
      margin: theme.spacing.regular,
      height: AVATAR_SIZE,
      borderRadius: theme.borders.radius.medium,
      backgroundColor: theme.colors.border,
    },
    avatarContainer: {
      margin: theme.spacing.regular,
      height: AVATAR_SIZE,
      width: AVATAR_SIZE,
      borderRadius: theme.borders.radius.circle,
      backgroundColor: theme.colors.border,
    },
    handle: {
      backgroundColor: theme.colors.background,
      borderTopStartRadius: theme.borders.radius.large,
      borderTopEndRadius: theme.borders.radius.large,
    },
  });

export default OnboardingProfileAvatar;
