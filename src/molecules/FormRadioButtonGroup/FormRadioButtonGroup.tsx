import {RadioButtonGroup} from 'atoms/RadioButtonGroup';
import {useFormikContext} from 'formik';
import {LocaleString} from 'locales/en';
import React, {useCallback, useEffect} from 'react';
import {PressEvent} from 'typings/utils';

type FormRadioButtonGroupProps = {
  title?: LocaleString;
  buttonOne: LocaleString;
  buttonTwo: LocaleString;
  value: boolean;
  name: string;
  onCheck?: PressEvent;
};
export const FormRadioButtonGroup = ({
  title,
  buttonOne,
  buttonTwo,
  value,
  name,
}: FormRadioButtonGroupProps) => {
  const {setFieldValue, getFieldMeta} = useFormikContext();
  const handleCheckBox = useCallback(
    (boxValue: string) => {
      setFieldValue(name, boxValue);
    },
    [setFieldValue, name],
  );
  useEffect(() => {
    setFieldValue(name, value);
  }, [setFieldValue, value, name]);

  return (
    <RadioButtonGroup
      title={title}
      buttonOne={buttonOne}
      buttonTwo={buttonTwo}
      onCheck={handleCheckBox}
      value={(getFieldMeta(name).value as string) || 'true'}
    />
  );
};
