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
  height?: number;
};

export type DatePickerFormProps = Merge<
  FormTextInputProps,
  InternalFormDateInputProps
>;

export const DatePickerForm: FC<DatePickerFormProps> = ({
  name,
  placeholder,
  minimumDate,
  maximumDate,
  initialDate,
  mode,
  height,
  ...props
}) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const {setFieldValue, getFieldMeta} = useFormikContext();
  useEffect(() => {
    if (initialDate) {
      setFieldValue(name, initialDate);
    }
  }, []);

  const {value} = getFieldMeta(name) as Date;
  const getDateTime = (date: Date) => {
    const dueDate = moment(date).utc().format('DD/MM/YYYY');
    setFieldValue(name, dueDate);
    setDatePickerVisible(false);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible);
  };

  const _initialDate: Date =
    initialDate !== undefined
      ? moment(initialDate).utc().format('DD/MM/YYYY')
      : new Date(moment(value).utc().format('DD/MM/YYYY'));

  return (
    <Touch onPress={toggleDatePicker}>
      <DateTimePicker
        visible={datePickerVisible}
        onCancel={toggleDatePicker}
        getDateTime={getDateTime}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        initialDate={
          value
            ? new Date(moment(value).utc().format('DD/MM/YYYY'))
            : _initialDate
        }
        mode={'date'}
      />
      <FormTextInput
        height={height}
        name={name}
        onFocus={toggleDatePicker}
        placeholder={placeholder}
        rightIcon={'calendar'}
        editable={false}
        onRightIconPress={toggleDatePicker}
        value={value as string}
        {...props}
      />
    </Touch>
  );
};
