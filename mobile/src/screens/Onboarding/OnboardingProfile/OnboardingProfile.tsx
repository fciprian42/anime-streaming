import React, { useState, useMemo, useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { useActionSheet } from "@expo/react-native-action-sheet";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Screen from "@components/Screen";
import TextInput from "@components/TextInput";
import Button from "@components/Button";

import { ScreenNavigationProp } from "@interfaces/router";
import { useAppDispatch, useAppSelector, useThemedStyles } from "@hooks/index";

import { ContextProps } from "themes";

import { updateToDatabse } from "@services/api";
import { setOnboardingEnded } from "@services/slices/session.slice";
import { RootState } from "@services/store";

import OnboardingProfileAvatar from "./OnboardingProfileAvatar";
import OnboardingProfilePictures from "./OnboardingProfilePictures";

const AVATAR_SIZE = 100;

interface Props {
  navigation: ScreenNavigationProp<"OnboardingProfile">;
}

const OnboardingProfile: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { top, bottom } = useSafeAreaInsets();

  const { showActionSheetWithOptions } = useActionSheet();

  const user = useAppSelector((state: RootState) => state.session.user);
  const isOAuth = useAppSelector((state: RootState) => state.session.oauth);

  const [openPicture, setOpenPicture] = useState<boolean>(false);
  const [openAvatars, setOpenAvatars] = useState<boolean>(false);

  const [firstname, setFirstname] = useState<string | undefined>(user.firstName);
  const [nickname, setNickname] = useState<string | undefined>(user.nickName);
  const [email, setEmail] = useState<string | undefined>(user.email);
  const [password, setPassword] = useState<string | undefined>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string | undefined>("");

  const canContinue = useMemo(() => {
    if (isOAuth) {
      return email && nickname && firstname && password && passwordConfirm;
    } else {
      return email && nickname && firstname;
    }
  }, [firstname, nickname, email, password, passwordConfirm]);

  const style = useThemedStyles(styles);

  const updateUser = () => {
    updateToDatabse(
      "users",
      {
        firstname,
        nickname,
        email,
        password,
        picture: user.picture,
        banner: user.banner,
      },
      user.id
    );

    dispatch(setOnboardingEnded());

    navigation.navigate("BottomTabs");
  };

  const openSheet = useCallback(() => {
    const options = ["Cancel", "Edit my banner", "Edit my picture"];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 1:
            setOpenPicture(true);
            break;
          case 2:
            setOpenAvatars(true);
            break;
          case cancelButtonIndex:
            break;
        }
      }
    );
  }, []);

  return (
    <Screen contentContainerStyle={[style.container, { paddingTop: top }]} preset="fixed">
      <Pressable onPress={openSheet} style={style.pictures}>
        <FastImage
          resizeMode="cover"
          source={{ uri: user.banner }}
          style={style.userBanner}
        />
        <FastImage
          resizeMode="cover"
          source={{ uri: user.picture }}
          style={style.userPicture}
        />
      </Pressable>
      <View style={style.form}>
        <TextInput
          placeholder="Enter your name"
          updateValue={setFirstname}
          value={firstname}
        />
        <TextInput
          placeholder="Enter your nickname"
          updateValue={setNickname}
          value={nickname}
        />
        <TextInput placeholder="Enter your mail" updateValue={setEmail} value={email} />
        {isOAuth ? (
          <>
            <TextInput
              placeholder="Enter your password"
              updateValue={setPassword}
              value={password}
              isFieldSecure
            />
            <TextInput
              placeholder="Confirm your password"
              updateValue={setPasswordConfirm}
              value={passwordConfirm}
              isFieldSecure
            />
          </>
        ) : null}
      </View>
      <View style={[style.footer, { paddingBottom: bottom, bottom: 0 }]}>
        <Button
          type="pressable"
          theme="primary"
          disabled={!canContinue}
          buttonStyles={style.button}
          content="Continue"
          onPress={updateUser}
        />
      </View>

      {openPicture && (
        <OnboardingProfilePictures toggleOpen={() => setOpenPicture(false)} />
      )}
      {openAvatars && (
        <OnboardingProfileAvatar toggleOpen={() => setOpenAvatars(false)} />
      )}
    </Screen>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.large,
      paddingVertical: theme.spacing.large,
    },
    form: {
      marginTop: AVATAR_SIZE - 24,
    },
    button: {
      borderRadius: theme.borders.radius.large,
      padding: 18,
      width: "100%",
    },
    footer: {
      width: "100%",
      alignSelf: "center",
      backgroundColor: theme.colors.background,
    },
    pictures: {
      position: "relative",
      width: "100%",
      height: 150,
      borderRadius: theme.borders.radius.medium,
      backgroundColor: theme.colors.border,
    },
    userBanner: {
      height: "100%",
      width: "100%",
      borderRadius: theme.borders.radius.medium,
    },
    userPicture: {
      borderRadius: theme.borders.radius.circle,
      backgroundColor: theme.colors.border,
      height: AVATAR_SIZE,
      width: AVATAR_SIZE,
      position: "absolute",
      alignSelf: "center",
      bottom: -AVATAR_SIZE / 2,
      borderWidth: 3,
      borderColor: theme.colors.border,
    },
  });

export default OnboardingProfile;
