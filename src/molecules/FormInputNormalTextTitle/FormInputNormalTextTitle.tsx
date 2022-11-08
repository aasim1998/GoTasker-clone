import React from 'react';
import {Text} from 'atoms/Text';
import {FormTextInput} from 'molecules/FormTextInput';
import {TextView} from 'atoms/TextView';
import {Image} from 'atoms/Image';
import {LocaleString} from 'locales/en';

type FormInputProps = {
  name: string;
  renderLeft?: any;
  reference: any;
  title: LocaleString;
};

export const FormInputNormalTextTitle = ({
  name,
  renderLeft,
  reference,
  title,
}: FormInputProps) => {
  return (
    <>
      <TextView color="black" mb="xm" text={title} variant="boldTitle" />
      <FormTextInput
        textAlign="left"
        fontSize={20}
        color="black"
        fontWeight="bold"
        name={name}
        paddingLeft={
          typeof renderLeft === 'string'
            ? 'smXXL'
            : typeof renderLeft === 'number'
            ? 'XL'
            : 'bm'
        }
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
        onSubmitEditing={() => reference.current.focus()}
      />
    </>
  );
};
