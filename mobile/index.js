/**
 * @format
 */

import "react-native-gesture-handler";

import { AppRegistry } from "react-native";
import appLoader from "./src/appLoader";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => appLoader);
