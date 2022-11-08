import React from 'react';
import {LocaleString} from 'locales/en';
import {FormSelectInput} from 'molecules/FormSelectInput';
import {TextView} from 'atoms/TextView';

type FormInputProps = {
  name: string;
  title: LocaleString;
  options: any;
  onChange: any;
  placeholder: string;
};

export const SelectInputTextTitle = ({
  name,
  title,
  options,
  onChange,
  placeholder,
}: FormInputProps) => {
  return (
    <>
      <TextView color="black" mb="xm" text={title} variant="boldTitle" />
      <FormSelectInput
        name={name}
        options={options}
        handleOnChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};
