import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgFavFill = ({ color, width , height }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width}
    height={height}
  >
    <Path
      d="m278.51,471.92c-7.04,3.63-14.78,5.46-22.52,5.46s-15.48-1.83-22.54-5.46C81.33,393.44-6.73,280.1,3.63,176.13c2.5-28.04,13.42-80.42,58.41-113.85,49.43-36.88,127.05-36.74,196.22-.42,68.49-36.09,142.68-36.2,191.74.44,46.63,34.83,56.36,91.35,58.37,114.04,10.34,103.76-77.72,217.1-229.86,295.58Z"
      fill={color}
      strokeWidth={0}
    />
  </Svg>
);

export default SvgFavFill;
