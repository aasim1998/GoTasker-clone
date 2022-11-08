import React from 'react';
import {Box, BoxProps} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {useColor} from 'hooks/useColor';
import theme from 'styles/theme';
import {isIOS} from 'utils/device';

export type ChipStausProps = {
  text: string;
  color: string;
} & BoxProps;
export const ChipStatus = ({text, color, ...props}: ChipStausProps) => {
  const internalColor = useColor(color || 'primary');
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      px="s"
      py={isIOS ? 'xxs' : '-xxs'}
       borderRadius={100}
      style={{
        backgroundColor: internalColor ? internalColor : theme.colors.chipRed,
      }}
      maxWidth={165}
      {...props}>
      <Text
        textTransform="capitalize"
        fontSize={16}
        color="whitePrimary"
        fontWeight="bold">
        {text}
      </Text>
    </Box>
  );
};
