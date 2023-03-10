import React, { useCallback, useEffect, useState } from "react";

import { StatusBar, Image, ImageRequireSource, useColorScheme, LogBox } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FontSource } from "expo-font";
import { Asset } from "expo-asset";
import { enableScreens, enableFreeze } from "react-native-screens";

import { Settings } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { initializeApp } from "firebase/app";

import { QueryClient, QueryClientProvider } from "react-query";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { persistor, store } from "@services/index";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { firebaseConfig, googleConfig } from "@config/index";

import Router from "@routes/router";

import { ThemeProvider, lightPalette, darkPalette } from "@themes/index";
import Splashscreen from "@screens/Splashscreen";

enableScreens(true);
enableFreeze(true);

Settings.initializeSDK();

const queryClient = new QueryClient();

if (__DEV__) {
  import("react-query-native-devtools").then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

LogBox.ignoreAllLogs();

const appLoader: React.FC = () => {
  const isDark = useColorScheme() === "dark";
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  const cacheImages = (images: ImageRequireSource[]) => {
    return images.map((image: ImageRequireSource) => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  };

  const cacheFonts = (fonts: Record<string, FontSource>[]) => {
    return fonts.map((font: Record<string, FontSource>) => Font.loadAsync(font));
  };

  /**
   * * onLayoutRootView
   *
   */
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  /**
   * `assetsLoading`
   * * SplashScreen.preventAutoHideAsync() prevent hidding splashscreen
   * * before assets and others fetchs are ended.
   */
  const assetsLoading = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();

      const imageAssets = cacheImages([
        require("@assets/images/onboarding/animes/demon-slayer.webp"),
        require("@assets/images/onboarding/animes/blue-lock.webp"),
        require("@assets/images/onboarding/animes/naruto.webp"),
        require("@assets/images/onboarding/animes/spy-x-family.webp"),
        require("@assets/images/onboarding/animes/jujutsu-kaisen.webp"),
        require("@assets/images/onboarding/animes/black-clover.webp"),
        require("@assets/images/onboarding/animes/my-hero-academia.webp"),
        require("@assets/images/onboarding/animes/re-zero.webp"),
        require("@assets/images/onboarding/animes/assasination-classroom.webp"),
        require("@assets/images/onboarding/animes/death-note.webp"),
        require("@assets/images/onboarding/animes/food-wars.webp"),
        require("@assets/images/onboarding/animes/tokyo-revengers.webp"),
        require("@assets/images/onboarding/animes/aot.webp"),
        require("@assets/images/onboarding/animes/chainsaw-man.webp"),
        require("@assets/images/onboarding/animes/aot-final.webp"),
        require("@assets/icons/interesets/action.webp"),
        require("@assets/icons/interesets/romance.webp"),
        require("@assets/icons/interesets/adventure.webp"),
        require("@assets/icons/interesets/thriller.webp"),
        require("@assets/icons/interesets/fantasy.webp"),
        require("@assets/icons/interesets/magic.webp"),
        require("@assets/icons/interesets/kids.webp"),
        require("@assets/icons/interesets/drama.webp"),
        require("@assets/icons/interesets/comedy.webp"),
        require("@assets/icons/interesets/cars.webp"),
        require("@assets/icons/interesets/horror.webp"),
        require("@assets/icons/interesets/demons.webp"),
        require("@assets/icons/interesets/space.webp"),
        require("@assets/icons/interesets/game.webp"),
        require("@assets/icons/interesets/music.webp"),
        require("@assets/icons/interesets/samurai.webp"),
        require("@assets/icons/interesets/school.webp"),
        require("@assets/icons/interesets/midoriya.webp"),
        require("@assets/icons/interesets/vegeta.webp"),
        require("@assets/icons/interesets/sports.webp"),
        require("@assets/icons/interesets/vampire.webp"),
        require("@assets/icons/interesets/isekai.webp"),
        require("@assets/icons/interesets/naruto.webp"),
      ]);

      const fontAssets = cacheFonts([
        require("@assets/fonts/Ubuntu-Medium.ttf"),
        require("@assets/fonts/Ubuntu-Regular.ttf"),
      ]);

      await Promise.all([...imageAssets, ...fontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(!appIsReady);
    }
  };

  const configureOAuthServices = () => {
    initializeApp(firebaseConfig);
    GoogleSignin.configure(googleConfig);
  };

  /**
   * `initCrashReporting` initialize crash reporting sentry
   * `assetsLoading` load all assets that the app require (fonts, images)
   */
  useEffect(() => {
    configureOAuthServices();
    assetsLoading();
  }, []);

  if (!appIsReady) {
    return <Splashscreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider dark={isDark} theme={isDark ? darkPalette : lightPalette}>
          <QueryClientProvider client={queryClient}>
            <ActionSheetProvider>
              <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <StatusBar barStyle="light-content" />
                <SafeAreaProvider>
                  <Router />
                </SafeAreaProvider>
              </GestureHandlerRootView>
            </ActionSheetProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default appLoader;
