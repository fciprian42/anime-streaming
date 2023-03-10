import * as React from "react";
import { ComponentType } from "react";
import {
  Image,
  ImageStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { IconProps } from "./icon.props";
import { iconRegistry } from "@interfaces/icons";

const Icon: React.FC<IconProps> = (props) => {
  const {
    icon,
    color,
    size,
    loadCallback,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View;

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        onLoadEnd={loadCallback}
        style={[
          $imageStyle,
          color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  );
};

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
};

export default Icon;
