import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";

import { TabParamList } from "@interfaces/router";

import Home from "@screens/Tabs/Home";

import { DownloadIcon, HomeIcon, ListIcon, ReleasesIcon } from "@assets/svg/navigation";
import { ContextProps } from "@themes/index";
import { useTheme, useThemedStyles } from "@hooks/index";

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabs: React.FC = () => {
  const { colors } = useTheme();
  const style = useThemedStyles(styles);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "rgba(158, 158, 158, 1)",
        tabBarStyle: style.tabBarContainer,
        tabBarBackground: () => {
          return <BlurView intensity={10} style={style.tabBar} />;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <HomeIcon fill={color} focused={focused} />;
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Home}
        options={{
          tabBarLabel: "Releases",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return <ReleasesIcon fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Live"
        component={Home}
        options={{
          tabBarLabel: "My List",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <ListIcon fill={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Reward"
        component={Home}
        options={{
          tabBarLabel: "Download",
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <DownloadIcon fill={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = (theme: ContextProps) =>
  StyleSheet.create({
    tabBar: {
      flex: 1,
      backgroundColor: "rgba(24, 26, 32, 0.85)",
    },
    tabBarContainer: {
      borderTopWidth: 0,
      paddingTop: 7,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      borderLeftWidth: 0.2,
      borderRightWidth: 0.2,
      position: "absolute",
      overflow: "hidden",
    },
  });

export default BottomTabs;
