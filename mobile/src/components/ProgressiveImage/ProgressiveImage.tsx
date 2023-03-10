import React, { useState } from "react";
import { View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import FastImage from "react-native-fast-image";

import { useTheme } from "@hooks/index";

interface Props {
  borderRadius: number;
  height: number;
  width: number;
  uri: string;
  style: any;
}

const ProgressiveImage: React.FC<Props> = (props) => {
  const { borderRadius, height, width, uri, style } = props;

  const { colors } = useTheme();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const opacity = useDerivedValue(() => {
    return imageLoaded ? 1 : 0;
  }, [imageLoaded]);

  const opacityImage = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 1000,
      }),
    };
  });

  return (
    <>
      {!imageLoaded && (
        <View>
          <SkeletonPlaceholder
            highlightColor={colors.border}
            backgroundColor={colors.input}
            borderRadius={borderRadius}
          >
            <SkeletonPlaceholder.Item width={width} height={height} />
          </SkeletonPlaceholder>
        </View>
      )}
      <Animated.View style={[opacityImage]}>
        <FastImage
          resizeMode="cover"
          onLoadEnd={() => setImageLoaded(true)}
          source={{ uri }}
          style={style}
        />
      </Animated.View>
    </>
  );
};

export default ProgressiveImage;
