import React, {FC} from 'react';
import {createBox, ColorProps} from '@shopify/restyle';
import {Theme} from 'styles/theme';
import {
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export const TouchBase = createBox<Theme, TouchableOpacityProps>(
  TouchableOpacity,
);
export type TouchProps = React.ComponentProps<typeof TouchBase> &
  ColorProps<Theme>;

export const TouchIcon: FC<TouchProps> = ({children, ...props}) => {
  return <TouchBase {...props}>{children}</TouchBase>;
};
