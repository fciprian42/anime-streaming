import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { Color } from "@themes/index";

interface SVGProps {
  fill: Color;
  focused?: boolean;
}

export const HomeIcon: React.FC<SVGProps> = React.memo(({ fill, focused }) => (
  <Svg width={22} height={22} fill={focused ? fill : "transparent"}>
    <Path
      d="M7.958 19.771v-3.066c0-.78.636-1.414 1.424-1.42h2.886c.791 0 1.433.636 1.433 1.42v3.076c0 .662.534 1.204 1.203 1.219h1.924c1.918 0 3.473-1.54 3.473-3.438v0-8.724a2.44 2.44 0 0 0-.962-1.905l-6.58-5.248a3.18 3.18 0 0 0-3.945 0L2.263 6.943A2.42 2.42 0 0 0 1.3 8.847v8.715C1.3 19.46 2.856 21 4.774 21h1.924c.685 0 1.24-.55 1.24-1.229v0"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const ReleasesIcon: React.FC<SVGProps> = React.memo(({ fill }) => (
  <Svg width={21} height={22} fill="none">
    <Path
      d="M1.492 8.404h17.824M14.843 12.31h.01M10.406 12.31h.01M5.959 12.31h.009M14.843 16.196h.01M10.406 16.196h.01M5.959 16.196h.009M14.444 1v3.29M6.366 1v3.29"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      clipRule="evenodd"
      d="M14.639 2.58H6.17c-2.936 0-4.77 1.635-4.77 4.642v9.05C1.4 19.326 3.234 21 6.17 21h8.458c2.946 0 4.771-1.645 4.771-4.653V7.222c.01-3.007-1.815-4.643-4.761-4.643Z"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const ListIcon: React.FC<SVGProps> = React.memo(({ fill }) => (
  <Svg width={18} height={22} fill="none">
    <Path
      clipRule="evenodd"
      d="M16.739 5.153c0-2.75-1.88-3.853-4.588-3.853H5.79c-2.624 0-4.59 1.027-4.59 3.67v14.724a.95.95 0 0 0 1.413.828l6.382-3.58 6.326 3.574a.95.95 0 0 0 1.417-.827V5.153Z"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.271 8.028h7.319"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));

export const DownloadIcon: React.FC<SVGProps> = React.memo(({ fill }) => (
  <Svg width={25} height={24} fill="none">
    <Path
      d="M12.722 15.436V3.395M15.638 12.508l-2.916 2.928-2.916-2.928"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.355 8.128h.933a3.684 3.684 0 0 1 3.684 3.685v4.884a3.675 3.675 0 0 1-3.675 3.675H7.157a3.685 3.685 0 0 1-3.685-3.685v-4.885a3.675 3.675 0 0 1 3.675-3.674h.942"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
));
