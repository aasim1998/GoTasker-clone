import React, {useMemo, forwardRef} from 'react';
import {createText, ColorProps} from '@shopify/restyle';
import i18n from 'i18n-js';
import {Theme} from 'styles/theme';
import {LocaleString} from 'locales/en';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {Box} from 'atoms/Box';

export const TextBase = createText<Theme>();

export type TextProps = React.ComponentPropsWithRef<typeof TextBase> &
  ColorProps<Theme> & {
    text?: LocaleString;
    ref?: any;
    values?: Record<string, string>;
    renderChildren?: boolean;
  };

export const MandatoryText = forwardRef<typeof TextBase, TextProps>(
  ({text, children, values, renderChildren, ...props}, ref) => {
    const textToBeDisplayed = useMemo(() => {
      if (text) {
        return i18n.t(text || '', values);
      } else {
        return children || null;
      }
    }, [text, children, values]);
    const fontFamily = props.fontFamily ? 'Roboto-Medium' : undefined;
    return (
      <Row>
        <TextBase fontFamily={fontFamily} ref={ref as any} {...props}>
          {textToBeDisplayed}
          {renderChildren === true ? children || null : null}
        </TextBase>
        <Box pl="xs" bottom={6}>
          <Text color="error" fontSize={25}>
            *
          </Text>
        </Box>
      </Row>
    );
  },
);
