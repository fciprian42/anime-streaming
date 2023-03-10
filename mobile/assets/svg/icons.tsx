import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

import { Color } from "@themes/index";

interface SVGProps {
  fill: Color;
}

export const Play: React.FC = React.memo(() => (
  <Svg width={16} height={16} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.334 8.004c0-3.68 2.992-6.67 6.667-6.67 3.674 0 6.666 2.99 6.666 6.67 0 3.672-2.992 6.663-6.666 6.663-3.675 0-6.667-2.991-6.667-6.663Zm9.112.674c.07-.07.16-.18.18-.205a.812.812 0 0 0-.013-.971 5.773 5.773 0 0 0-.212-.225C9.873 6.71 8.496 5.783 7.775 5.5c-.109-.044-.386-.141-.534-.148a.895.895 0 0 0-.405.097.834.834 0 0 0-.36.398 4.301 4.301 0 0 0-.116.47c-.071.38-.11.997-.11 1.679 0 .65.039 1.241.097 1.627l.016.072c.026.13.08.402.138.513a.81.81 0 0 0 .715.438h.025c.193-.007.599-.174.599-.18.682-.284 2.027-1.165 2.567-1.75l.039-.039Z"
      fill="#fff"
    />
  </Svg>
));

export const Plus: React.FC = React.memo(() => (
  <Svg width={16} height={16} fill="none">
    <Path d="M12.667 7.333h-4v-4H7.334v4h-4v1.334h4v4h1.333v-4h4V7.333Z" fill="#fff" />
  </Svg>
));

export const Back: React.FC = React.memo(() => (
  <Svg width={20} height={17} fill="none">
    <Path
      d="M.959 8.32h17.5M8.018 15.349.959 8.32l7.059-7.03"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const Rating: React.FC<SVGProps> = React.memo(({ fill }) => (
  <Svg width={18} height={16} fill="none">
    <Path
      opacity={0.4}
      d="m9.813.595 1.855 3.728c.137.27.398.458.699.5l4.167.607a.934.934 0 0 1 .614.358c.147.194.21.439.175.68a.927.927 0 0 1-.268.527l-3.02 2.927a.88.88 0 0 0-.267.803l.743 4.115a.93.93 0 0 1-.743 1.06.974.974 0 0 1-.595-.095l-3.718-1.937a.974.974 0 0 0-.877 0L4.86 15.805a.952.952 0 0 1-1.277-.373.943.943 0 0 1-.096-.582l.743-4.117a.884.884 0 0 0-.267-.803L.943 7.004a.904.904 0 0 1-.024-1.277l.024-.025a.898.898 0 0 1 .535-.262l4.167-.608a.928.928 0 0 0 .699-.5L8.133.595c.159-.32.489-.52.847-.511h.112a.93.93 0 0 1 .72.51"
      fill={fill}
    />
    <Path
      d="M8.993 13.764a1.022 1.022 0 0 0-.46.126l-3.7 1.933a.965.965 0 0 1-1.248-.385.922.922 0 0 1-.096-.578l.739-4.107a.92.92 0 0 0-.268-.813L.94 7.016a.91.91 0 0 1-.015-1.287l.014-.014a.945.945 0 0 1 .527-.264l4.171-.614a.902.902 0 0 0 .697-.5L8.147.553A.921.921 0 0 1 9 .085c-.006.248-.006 13.511-.006 13.68"
      fill={fill}
    />
  </Svg>
));

export const ArrowRight: React.FC<SVGProps> = React.memo(({ fill }) => (
  <Svg width={8} height={12} fill="none">
    <Path
      d="M1.666 1.333 6.333 6l-4.667 4.666"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const SearchIcon: React.FC = React.memo(() => (
  <Svg width={28} height={28} fill="none">
    <Circle
      cx={13.727}
      cy={13.728}
      r={10.487}
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="m21.021 21.566 4.112 4.1"
      stroke="#fff"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));
