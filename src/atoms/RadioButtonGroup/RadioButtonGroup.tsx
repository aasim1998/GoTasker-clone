import React from 'react';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {LocaleString} from 'locales/en';
import {RadioButton} from 'react-native-paper';
import {PressEvent} from 'typings/utils';
import theme from 'styles/theme';

type RadioButtonGroupProps = {
  buttonOne: LocaleString;
  buttonTwo: LocaleString;
  title: LocaleString;
  onCheck: PressEvent;
  value: string;
};

export const RadioButtonGroup = ({
  buttonOne,
  buttonTwo,
  onCheck,
  value,
  title,
}: RadioButtonGroupProps) => {
  return (
    <RadioButton.Group
      onValueChange={newValue => onCheck(newValue)}
      value={value}>
      <Text localeId={title} variant="body" />
      <Row alignItems="center">
        <RadioButton.Android
          value="true"
          color={theme.colors.radioButtonColor}
        />
        <Text localeId={buttonOne} color="zBlack" ml="-s" />
        <RadioButton.Android
          value="false"
          color={theme.colors.radioButtonColor}
        />
        <Text localeId={buttonTwo} color="zBlack" ml="-s" />
      </Row>
    </RadioButton.Group>
  );
};
