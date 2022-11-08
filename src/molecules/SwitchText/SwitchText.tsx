import React from 'react';
import {Text} from 'atoms/Text';
import {Row} from 'atoms/Row';
import {ToggleSwitch} from 'atoms/Toggle';
import {Divider} from 'atoms/Divider';
import {Box} from 'atoms/Box';
import theme from 'styles/theme';

type SwitchTextProps = {
  name?: string;
  value?: string;
  onToggle?: any;
};
export const SwitchText = ({name, value, onToggle}: SwitchTextProps) => {
  return (
    <Box justifyContent="center">
      <Row
        py="s"
        justifyContent="space-between"
        paddingRight="m"
        alignItems="center">
        <Text localeId={name} variant="bodyLight" px="m" color="darkText" />
        <Box>
          <ToggleSwitch
            isSwitchOn={value}
            onToggleSwitch={onToggle}
            color={theme.colors.orangePrimary}
          />
        </Box>
      </Row>
      <Divider height={1} width="100%" />
    </Box>
  );
};
