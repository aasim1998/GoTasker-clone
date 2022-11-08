import React from 'react';
import {Box} from 'atoms/Box';
import {Image} from 'atoms/Image';
import {TextView} from 'atoms/TextView';
import {LocaleString} from 'locales/en';
import {FormTextInputWithoutHelper} from 'molecules/FormTextInputWithoutHelper';
import theme from 'styles/theme';
import {Row} from 'atoms/Row';
import {ImageSourcePropType} from 'react-native';

type InsuranceFormTextInputProps = {
  title?: LocaleString;
  name: string;
  leftImage?: ImageSourcePropType;
  keyboardType: any;
  maxLength?: number;
  autoFocus?: boolean;
};

export const InsuranceFormTextInput = ({
  title,
  name,
  leftImage,
  keyboardType,
  maxLength,
  autoFocus,
}: InsuranceFormTextInputProps) => {
  return (
    <Box mb="m">
      <Row mt="-s" pb="m">
        <TextView fontSize={16} text={title} color="secondaryGrey" />
        <TextView text="star.text" fontSize={16} color="chipRed" />
      </Row>
      <FormTextInputWithoutHelper
        paddingLeft={leftImage ? 'xl' : 'm'}
        renderLeft={
          leftImage ? (
            <Box
              position="absolute"
              justifyContent="center"
              paddingTop="mll"
              paddingLeft="xs"
              left={theme.spacing.sl}>
              <Image source={leftImage} width={16} height={16} />
            </Box>
          ) : null
        }
        name={name}
        textAlignVertical="bottom"
        autoCapitalize="sentences"
        borderRadius={6}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        height={55}
        color="black"
        borderColor="borderGrey"
        fontSize={18}
        maxLength={maxLength}
      />
    </Box>
  );
};
