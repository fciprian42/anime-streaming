import React, { useMemo } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { TransitionSpecs, CardStyleInterpolators } from "@react-navigation/stack";

import { RootStackParamList } from "@interfaces/router";

import Onboarding from "@screens/Onboarding";
import OnboardingInteresets from "@screens/Onboarding/OnboardingInterests";
import Login from "@screens/Login";
import Anime from "@screens/Anime";
import CategoryFilter from "@screens/CategoryFilter";
import OnboardingProfile from "@screens/Onboarding/OnboardingProfile";
import BottomTabs from "./bottom-stack";

import { useAppSelector } from "@hooks/index";
import { RootState } from "@services/store";

const Stack = createStackNavigator<RootStackParamList>();

const MainStack: React.FC = () => {
  const isBoarding = useAppSelector((state: RootState) => state.session.boarding);
  const token = useAppSelector((state: RootState) => state.session.token);

  return (
    <Stack.Navigator initialRouteName={isBoarding && token ? "BottomTabs" : "Onboarding"}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
          gestureEnabled: false,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
            animationEnabled: false,
            gestureEnabled: false,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
          }}
        />
        <Stack.Screen
          name="OnboardingInteresets"
          component={OnboardingInteresets}
          options={{
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="OnboardingProfile"
          component={OnboardingProfile}
          options={{
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="Anime"
          component={Anime}
          options={{
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen
          name="CategoryFilter"
          component={CategoryFilter}
          options={{
            headerShown: false,
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainStack;
