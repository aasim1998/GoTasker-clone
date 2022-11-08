import React, {forwardRef, useMemo} from 'react';
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
  SpacingProps,
  TypographyProps,
  LayoutProps,
  layout,
} from '@shopify/restyle';
import {Theme} from 'styles/theme';
import {RectButton as RNButton} from 'react-native-gesture-handler';
import {Box} from 'atoms/Box';
import {LocaleString} from 'locales/en';
import {Spinner} from 'atoms/Spinner';
import {ButtonText} from './atoms/ButtonText';

export type ButtonProps = React.ComponentPropsWithRef<typeof RNButton> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  TypographyProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> & {
    title: LocaleString;
    loading?: boolean;
  };

const buttonVariant = createVariant<Theme>({
  themeKey: 'buttonVariants',
});
const restyleFunctions = [
  spacing,
  border,
  backgroundColor,
  layout,
  buttonVariant,
];
export const Button = forwardRef<RNButton, ButtonProps>(
  ({title, onPress, loading, variant: internalVariant, ...rest}, ref) => {
    const props = useRestyle(restyleFunctions as any, {
      ...rest,
      variant: internalVariant,
    });

    const styles = useMemo(
      () => ({
        borderRadius: 4,
      }),
      [],
    );
    return (
      <RNButton onPress={loading ? undefined : onPress} ref={ref}>
        <Box width="100%" {...(props as any)}>
          {loading ? (
            <Spinner color="whiteText" />
          ) : (
            <ButtonText variant={internalVariant} localeId={title} />
          )}
        </Box>
      </RNButton>
    );
  },
);
Button.defaultProps = {
  variant: 'primary',
};
