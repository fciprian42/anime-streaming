import React, { useLayoutEffect, useCallback } from "react";
import { StyleSheet, StatusBar, View } from "react-native";

import { Profile } from "react-native-fbsdk-next";
import { User } from "@react-native-google-signin/google-signin";
import { appleAuth } from "@invertase/react-native-apple-authentication";

import Screen from "@components/Screen";
import Button from "@components/Button";
import { SocialButton } from "@components/Button/SocialButton";
import CustomText from "@components/CustomText";

import { ContextProps, spacing } from "@themes/index";

import { useAppDispatch, useAppSelector, useTheme, useThemedStyles } from "@hooks/index";

import { ScreenNavigationProp, Session } from "@interfaces/index";
import { LoginFacebookManager, LoginGoogleManager, writeToDatabase } from "@services/api";
import { setLoginWithOAuth } from "@services/slices/session.slice";
import { RootState } from "@services/store";

interface Props {
  navigation: ScreenNavigationProp<"Login">;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const { preferred_interesets, picture, banner, firstName, nickName, email } =
    useAppSelector((state: RootState) => state.session.user);
  const { boarding } = useAppSelector((state: RootState) => state.session);
  const style = useThemedStyles(styles);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);

  const oauthFacebook = useCallback(async (session: any) => {
    if (session) {
      try {
        const currentUser = await Profile.getCurrentProfile();

        if (currentUser) {
          const data: Session = {
            user: {
              id: session.userID,
              preferred_interesets,
              firstName: firstName ? firstName : currentUser.firstName,
              nickName: nickName ? nickName : currentUser.lastName,
              email: email ? email : session.email,
              picture,
              banner,
            },
            oauth: true,
            boarding,
            theme: "light",
            oauth_type: "facebook",
            token: session.accessToken,
          };

          dispatch(setLoginWithOAuth(data));

          writeToDatabase(
            "users",
            {
              firstname: firstName ? firstName : currentUser.firstName,
              nickname: nickName ? nickName : currentUser.lastName,
              picture,
              banner,
              oauth: "facebook",
              email: email ? email : session.email,
            },
            session.userID
          );

          if (!boarding) {
            navigation.navigate("OnboardingInteresets");
          } else {
            navigation.navigate("BottomTabs");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const oauthApple = useCallback(async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const data: Session = {
        user: {
          id: parseInt(appleAuthRequestResponse.user),
          preferred_interesets,
          firstName: firstName ? firstName : appleAuthRequestResponse.fullName,
          nickName: nickName ? nickName : appleAuthRequestResponse.fullName,
          email: appleAuthRequestResponse.email || null,
          picture,
          banner,
        },
        oauth: true,
        boarding,
        theme: "light",
        oauth_type: "apple",
        token: appleAuthRequestResponse.identityToken,
      };

      dispatch(setLoginWithOAuth(data));

      writeToDatabase(
        "users",
        {
          firstname: firstName ? firstName : appleAuthRequestResponse.fullName,
          nickname: nickName ? nickName : appleAuthRequestResponse.fullName,
          picture,
          banner,
          oauth: "apple",
          email: email ? email : appleAuthRequestResponse.email,
        },
        parseInt(appleAuthRequestResponse.identityToken)
      );

      if (!boarding) {
        navigation.navigate("OnboardingInteresets");
      } else {
        navigation.navigate("BottomTabs");
      }
    }
  }, []);

  const oauthGoogle = useCallback(async (user: User) => {
    if (user) {
      try {
        const data: Session = {
          user: {
            id: parseInt(user.user.id),
            preferred_interesets,
            firstName: firstName ? firstName : user.user.givenName,
            nickName: nickName ? nickName : user.user.familyName,
            email: email ? email : user.user.email,
            picture,
            banner,
          },
          oauth: true,
          boarding,
          theme: "light",
          oauth_type: "google",
          token: user.idToken,
        };

        dispatch(setLoginWithOAuth(data));

        writeToDatabase(
          "users",
          {
            firstname: firstName ? firstName : user.user.givenName,
            nickname: nickName ? nickName : user.user.familyName,
            picture,
            banner,
            oauth: "google",
            email: email ? email : user.user.email,
          },
          parseInt(user.user.id)
        );

        if (!boarding) {
          navigation.navigate("OnboardingInteresets");
        } else {
          navigation.navigate("BottomTabs");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [boarding]);

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
          style={{ marginBottom: spacing.small }}
          content="Welcome"
        />
        <CustomText color="textBody" type="h5" content="Sign in to start" />
      </View>
      <View>
        <SocialButton
          style={style.socialButton}
          onPress={() => LoginFacebookManager(oauthFacebook)}
          title="Continue with Facebook"
          icon="facebook"
        />
        <SocialButton
          style={style.socialButton}
          onPress={() => LoginGoogleManager(oauthGoogle)}
          title="Continue with Google"
          icon="google"
        />
        <SocialButton
          style={style.socialButton}
          onPress={oauthApple}
          title="Continue with Apple"
          icon="apple"
        />
      </View>
      <View style={style.divider}>
        <View style={style.dividerLine} />
        <CustomText color="textBody" type="h5" content="or" />
        <View style={style.dividerLine} />
      </View>
      <View>
        <Button
          type="pressable"
          theme="primary"
          buttonStyles={style.button}
          content="Sign in with password"
          shadowConfig={{
            shadowColor: colors.primary,
            shadowOffset: {
              width: 4,
              height: 8,
            },
            shadowRadius: 24,
            shadowOpacity: 0.25,
          }}
        />
        <Button
          type="pressable"
          color="textBody"
          text="h6"
          buttonStyles={[style.button, { marginTop: 10 }]}
          content="Don’t have an account?"
        />
      </View>
    </Screen>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.spacing.large,
      paddingTop: theme.spacing.large,
    },
    header: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 60,
    },
    button: {
      borderRadius: theme.borders.radius.large,
      backgroundColor: theme.colors.primary,
      width: "100%",
      padding: theme.spacing.regular,
    },
    divider: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.extraLarge,
      marginTop: theme.spacing.large,
    },
    dividerLine: {
      backgroundColor: theme.colors.border,
      height: 1,
      width: 140,
    },
    socialButton: {
      marginBottom: theme.spacing.medium,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });

export default Login;
