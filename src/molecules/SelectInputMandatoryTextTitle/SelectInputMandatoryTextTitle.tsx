import React from 'react';
import {LocaleString} from 'locales/en';
import {MandatoryText} from 'atoms/MandatoryText';
import {FormSelectInput} from 'molecules/FormSelectInput';

type FormInputProps = {
  name: string;
  title: LocaleString;
  options: any;
  onChange: any;
  placeholder: string;
};

export const SelectInputMandatoryTextTitle = ({
  name,
  title,
  options,
  onChange,
  placeholder,
}: FormInputProps) => {
  return (
    <>
      <MandatoryText color="black" mb="xm" text={title} variant="boldTitle" />
      <FormSelectInput
        name={name}
        options={options}
        handleOnChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};
