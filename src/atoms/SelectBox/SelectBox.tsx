import React from 'react';
import {Icon, IconName} from 'atoms/Icon';
import {Text} from 'atoms/Text';
import {LocaleString} from 'locales/en';
import {
  createRestyleComponent,
  VariantProps,
  createVariant,
} from '@shopify/restyle';
import {Theme} from 'styles/theme';
import {Touch, TouchProps} from 'atoms/Touch';
import {FalseyValue} from 'typings/utils';

type SelectBoxProps = {
  text: LocaleString;
  iconName: IconName;
  selected?: boolean;
  error?: string | FalseyValue;
  fontStyle: string;
  textColor: string;
  size: number;
} & TouchProps;

export const SelectBoxVariants = {
  selected: {},
};

const Container = createRestyleComponent<
  VariantProps<Theme, 'selectBoxVariants'> & React.ComponentProps<typeof Touch>,
  Theme
>([createVariant({themeKey: 'selectBoxVariants'})], Touch);

type Variant = 'nonSelected' | 'error' | 'selected';
export const SelectBox = ({
  selected,
  error,
  text,
  iconName,
  fontStyle,
  textColor,
  size,
  ...props
}: SelectBoxProps) => {
  let variant: Variant = 'nonSelected';
  if (error) {
    variant = 'error';
  } else if (selected) {
    variant = 'selected';
  }
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      borderRadius={4}
      borderWidth={1}
      variant={variant}
      height={42}
      {...props}>
      <Icon name={iconName} size={size} />
      <Text
        px="xs"
        fontSize={14}
        localeId={text}
        color={textColor}
        fontWeight="500"
      />
    </Container>
  );
};
