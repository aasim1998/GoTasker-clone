import React, {forwardRef, useState, useEffect} from 'react';
import {useDebounce} from 'use-debounce';
import {
  ColorProps,
  useRestyle,
  spacing,
  border,
  backgroundColor,
  BorderProps,
  BackgroundColorProps,
  createVariant,
  VariantProps,
  typography,
  SpacingProps,
  TypographyProps,
  layout,
  LayoutProps,
} from '@shopify/restyle';
import {TextInput as RNTextInput} from 'react-native';
import {Icon, IconProps} from 'atoms/Icon';
import theme, {Theme} from 'styles/theme';
import {Box} from 'atoms/Box';
import {useColor} from 'hooks/useColor';
import {translate} from 'utils/locale';
import {LocaleString} from 'locales/en';
import {Touch} from 'atoms/Touch';
import {Spinner} from 'atoms/Spinner';

export type TextInputWithoutHelperProps = React.ComponentPropsWithRef<typeof RNTextInput> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  SpacingProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  VariantProps<Theme, 'textInputVariants'> & {
    errorMessage?: string | boolean;
    iconColor?: string;
    containerProps?: React.ComponentProps<typeof Box>;
    renderRight?: React.ReactNode;
    renderLeft?: React.ReactNode;
    rightIcon?: IconProps['name'];
    onRightIconPress?: () => void;
    rightIconSize?: number;
    rightIconColor?: string;
    rightIconProps?: Partial<IconProps>;
    loading?: boolean;
    debounce?: boolean;
    placeholder?: string;
  };

const variant = createVariant<Theme>({
  themeKey: 'textInputVariants',
  defaults: {
    fontFamily: 'Poppins-Regular',
    height: 42,
    fontSize: 14.7,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 'm',
    paddingHorizontal: 's',
    borderColor: 'textInputBorderColor',
    backgroundColor: 'textInputBackground',
    justifyContent: 'center',
  },
});
const restyleFunctions = [
  spacing,
  border,
  layout,
  backgroundColor,
  typography,
  variant,
];

export const TextInputWithoutHelper = forwardRef<RNTextInput, TextInputWithoutHelperProps>(
  (
    {
      placeholder,
      errorMessage,
      containerProps,
      rightIcon,
      renderLeft,
      onRightIconPress,
      rightIconSize = 20,
      rightIconColor,
      rightIconProps,
      loading,
      iconColor,
      debounce,
      value,
      onChangeText,
      ...rest
    },
    ref,
  ) => {
    const props = useRestyle(restyleFunctions as any, rest as any);
    const darkTextColor = useColor('darkText');
    const [text, setText] = useState(value);
    const [debouncedValue] = useDebounce(text, 400);

    const handleChange = (value: string) => {
      if (debounce) {
        setText(value);
      }
    };

    useEffect(() => {
      if (debounce) {
        if (typeof onChangeText === 'function') {
          onChangeText(debouncedValue || '');
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, debounce]);

    const renderRight = () => {
      if (loading) {
        return (
          <Spinner
            zIndex={10}
            position="absolute"
            color="primary"
            paddingTop="sl"
            top={0}
            right={0}
            paddingRight="s"
            size="small"
          />
        );
      }
      if (rightIcon) {
        return (
          <Touch
            onPress={onRightIconPress}
            justifyContent="center"
            zIndex={10}
            position="absolute"
            paddingTop="xm"
            top={0}
            right={0}
            paddingRight="s">
            <Icon
              color={
                rightIconColor ? rightIconColor : theme.colors.whitePrimary
              }
              size={rightIconSize}
              name={rightIcon}
              onPress={onRightIconPress}
              {...rightIconProps}
            />
          </Touch>
        );
      }
      return null;
    };
    return (
      <Box width="100%" {...containerProps}>
        {renderRight()}
        {renderLeft && (
          <Box pl="m" position="absolute" height={42} left={0} zIndex={100}>
            {renderLeft}
          </Box>
         )}
        <RNTextInput
          placeholderTextColor="#000"
          placeholder={placeholder}
          selectionColor={darkTextColor}
          ref={ref as any}
          value={debounce ? text : value}
          onChangeText={debounce ? handleChange : onChangeText}
          placeholder={translate(`${placeholder}` as LocaleString)}
          {...props}
        />
      </Box>
    );
  },
);
