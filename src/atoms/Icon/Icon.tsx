import React, {FC} from 'react';
import IcoMoon from 'react-icomoon';
import {Svg, Path} from 'react-native-svg';

import {ViewProps, TouchableOpacity} from 'react-native';
import {LiteralUnion} from 'typings/utils';
import {PressEvent} from 'typings/utils';
export type IconName = LiteralUnion<'home' | 'music' | 'phone' | 'add', string>;

const iconSet = require('../../assets/icon/selection.json');
export interface IconProps extends ViewProps {
  name: IconName;
  color?: string;
  size?: number;
  onPress?: PressEvent;
}
export const Icon: FC<IconProps> = ({
  name,
  color,
  size,
  onPress,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <IcoMoon
        native
        icon={name}
        size={size}
        color={color}
        iconSet={iconSet}
        SvgComponent={Svg}
        PathComponent={Path}
        {...props}
      />
    </TouchableOpacity>
  );
};
Icon.defaultProps = {
  size: 24,
  color: 'black',
};
Icon.displayName = 'Icon';
