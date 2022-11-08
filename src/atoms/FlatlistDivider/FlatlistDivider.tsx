import React, {FC} from 'react';
import {Box, BoxProps} from 'atoms/Box';
import theme from 'styles/theme';

export const FlatlistDivider: FC<BoxProps> = ({...props}) => {
  return <Box height={1} bg="greyish" {...props} />;
};
