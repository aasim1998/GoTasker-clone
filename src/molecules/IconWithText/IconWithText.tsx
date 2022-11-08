import React from 'react';
import {Icon} from 'atoms/Icon';
import {TextView} from 'atoms/TextView';
import theme from 'styles/theme';
import {Row} from 'atoms/Row';

type IconWithTextProps = {
  iconName?: string;

  textDescription?: string;
};

export const IconWithText = ({
  iconName,
  textDescription,
}: IconWithTextProps) => {
  return (
    <Row justifyContent="space-between" mt="s" mx="sl">
      <Icon name={iconName} size={17} color={theme.colors.black} />
      <TextView px="s" mt="-xxs" color="darkText">
        {textDescription}
      </TextView>
    </Row>
  );
};
