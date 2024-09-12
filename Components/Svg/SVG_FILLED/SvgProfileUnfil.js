import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgProfileUnfill = ({ strokeColor, strokeWidth, width = 24, height = 24 }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width}
    height={height}
  >
    <Path
      d="m144.93,116.87c0-61.27,49.7-110.96,111.18-110.96s110.96,49.7,110.96,110.96-49.7,110.96-110.96,110.96-111.18-49.7-111.18-110.96Z"
      fill="none"
      stroke={strokeColor}
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
    <Path
      d="m506.1,448.83h0c0,31.63-25.64,57.26-57.26,57.26H63.17c-31.63,0-57.26-25.64-57.26-57.26h0c0-9.11,1.93-18.22,6.21-26.25,46.46-87.12,138.18-146.55,243.99-146.55s197.32,59.43,243.77,146.55c4.28,8.03,6.21,17.14,6.21,26.25Z"
      fill="none"
      stroke={strokeColor}
      strokeMiterlimit={10}
      strokeWidth={strokeWidth}
    />
  </Svg>
);

export default SvgProfileUnfill;
