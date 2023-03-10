import type { RouteProp, CompositeScreenProps } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  BottomTabs: undefined;
  Onboarding: undefined;
  OnboardingInteresets: undefined;
  OnboardingProfile: undefined;
  Login: undefined;
  Anime: { id: string };
  CategoryFilter: { category: string; title: string; type: "flat" | "list" };
};

export type TabParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  Explore: NavigatorScreenParams<RootStackParamList>;
  Live: NavigatorScreenParams<RootStackParamList>;
  Reward: NavigatorScreenParams<RootStackParamList>;
  Profile: NavigatorScreenParams<RootStackParamList>;
};

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  StackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
