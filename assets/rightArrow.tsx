import React, {ReactElement} from 'react';
import {ImageStyle} from 'react-native';
import {SvgXml} from 'react-native-svg';

const rightArrow = (
  fill: string,
) => `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="24" height="24" transform="translate(0.925293)" fill="white" fill-opacity="0.01"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.4706 19.815L8.42529 18.75L15.3124 11.7825L8.42529 4.815L9.4706 3.75L17.4253 11.7825L9.4706 19.815Z" fill=${fill}/>
</svg>`;

export const rightArrowIcon = (
  fill: string,
  customStyle: ImageStyle = {},
  accessibilityLabel = '',
): ReactElement => {
  return (
    <SvgXml
      style={[{height: 78, width: 76}, customStyle]}
      xml={rightArrow(fill)}
      accessibilityLabel={accessibilityLabel}
      testID="rightArrow_testID"
    />
  );
};
