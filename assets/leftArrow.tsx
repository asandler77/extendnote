import React, {ReactElement} from 'react';
import {ImageStyle} from 'react-native';
import {SvgXml} from 'react-native-svg';

const leftArrow = (
  fill: string,
) => `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" transform="translate(0.925781)" fill="white" fill-opacity="0.01"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.7233 20.0325L7.67578 12L15.7233 3.96753L16.7808 5.03253L9.81328 12L16.7808 18.9675L15.7233 20.0325Z" fill=${fill}/>
</svg>`;

export const leftArrowIcon = (
  fill: string,
  customStyle: ImageStyle = {},
  accessibilityLabel = '',
): ReactElement => {
  return (
    <SvgXml
      style={[{height: 78, width: 76}, customStyle]}
      xml={leftArrow(fill)}
      accessibilityLabel={accessibilityLabel}
      testID="leftArrowTestID"
    />
  );
};
