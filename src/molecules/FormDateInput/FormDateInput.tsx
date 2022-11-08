import React, {useEffect, useState} from 'react';
import {DateTimePicker} from 'atoms/DateTimePicker';
import {FormTextInput, FormTextInputProps} from 'molecules/FormTextInput';
import {FC} from 'react';
import {Merge} from 'typings/utils';
import {useFormikContext} from 'formik';
import {LocaleString} from 'locales/en';
import {Touch} from 'atoms/Touch';
import moment from 'moment';

type InternalFormDateInputProps = {
  name: string;
  placeholder: LocaleString | string;
  mode?: 'date' | 'time' | 'datetime';
  initialDate?: Date | undefined | string;
  minimumDate?: 'today' | Date;
  maximumDate?: 'today' | Date;
};

export type FormDateInputProps = Merge<
  FormTextInputProps,
  InternalFormDateInputProps
>;

export const FormDateInput: FC<FormDateInputProps> = ({
  name,
  placeholder,
  minimumDate,
  maximumDate,
  initialDate,
  mode,
  ...props
}) => {
  useEffect(() => {
    if (initialDate) {
      setFieldValue(name, initialDate);
    }
  }, []);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const {setFieldValue, getFieldMeta} = useFormikContext();

  const findDate = getFieldMeta(name).value as Date;
  const [date, setDate] = useState(initialDate || findDate || null);

  const getDateTime = (date: Date) => {
    const dueDate = moment(date).utc().format('YYYY-MM-DD');
    setFieldValue(name, dueDate);
    setDate(dueDate);
    setDatePickerVisible(false);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const textInputValue =
    date === null
      ? name === 'startDate'
        ? 'Start Date'
        : 'End Date'
      : date < new Date()
      ? new Date().toLocaleDateString('en-GB')
      : new Date(date).toLocaleDateString('en-GB');

  const _initialDate: Date = moment(initialDate).utc().format('YYYY-MM-DD');
  return (
    <Touch onPress={toggleDatePicker}>
      <DateTimePicker
        visible={datePickerVisible}
        onCancel={toggleDatePicker}
        getDateTime={getDateTime}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        initialDate={new Date(date)}
        mode={'date'}
      />
      <FormTextInput
        name={name}
        onFocus={toggleDatePicker}
        placeholder={placeholder}
        rightIcon={'calendar'}
        editable={false}
        onRightIconPress={toggleDatePicker}
        value={textInputValue}
        {...props}
      />
    </Touch>
  );
};
