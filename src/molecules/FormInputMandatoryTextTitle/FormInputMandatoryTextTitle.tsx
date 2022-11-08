import React from 'react';
import {Text} from 'atoms/Text';
import {FormTextInput} from 'molecules/FormTextInput';
import {Image} from 'atoms/Image';
import {LocaleString} from 'locales/en';
import {MandatoryText} from 'atoms/MandatoryText';

type FormInputProps = {
  name: string;
  renderLeft?: any;
  reference: any;
  title: LocaleString;
  keyboardType?: string;
  maxLength?: number;
};

export const FormInputMandatoryTextTitle = ({
  name,
  renderLeft,
  reference,
  title,
  keyboardType,
  maxLength,
}: FormInputProps) => {
  return (
    <>
      <MandatoryText color="black" mb="xm" text={title} variant="boldTitle" />
      <FormTextInput
        maxLength={maxLength}
        fontSize={20}
        color="black"
        fontWeight="bold"
        textAlign="left"
        name={name}
        paddingLeft={renderLeft && 'XL'}
        keyboardType={keyboardType}
        borderRadius={7}
        renderLeft={
          typeof renderLeft === 'string' ? (
            <Text pt="xm" fontSize={20} color="darkText" fontWeight="bold">
              {renderLeft}
            </Text>
          ) : (
            <Image height={35} mt="s" width={35} source={renderLeft} />
          )
        }
        backgroundColor="transparent"
        textAlignVertical="top"
        onSubmitEditing={() => reference.current.focus()}
      />
    </>
  );
};
