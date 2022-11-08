import {BoxProps, Box} from 'atoms/Box';
import {DateTimePicker} from 'atoms/DateTimePicker';
import {FloatingTextInput} from 'atoms/FloatingTextInput';
import {TextInputProps} from 'atoms/TextInput';
import {Touch} from 'atoms/Touch';
import {LocaleString} from 'locales/en';
import React, {FC, useMemo, useState} from 'react';
import {Merge, PressEvent} from 'typings/utils';
import {US_TIME_FORMAT} from 'utils/datetime';
import {translate} from 'utils/locale';
import {useFormikContext} from 'formik';

type FormDateInputInputProps = Merge<
  {
    placeholder?: LocaleString;
    initialDate?: 'today' | Date | any;
    initialTime?: '' | any;
    minimumDate?: 'today' | Date | any;
    maximumDate?: 'today' | Date | any;
    isFocused?: boolean;
    name: string;
    label?: LocaleString;
    getTime: PressEvent;
  },
  Partial<TextInputProps>
>;

const textInputContainerProps: BoxProps = {
  pointerEvents: 'none',
};

export const FormTimeInput: FC<FormDateInputInputProps> = ({
  placeholder,
  initialDate,
  initialTime,
  getTime,
  minimumDate,
  maximumDate,
  name,
  label,
  isFocused,
  ...props
}) => {
  const {setFieldValue, getFieldMeta} = useFormikContext();

  const {value} = getFieldMeta(name);

  const [data, setData] = useState(
    Boolean(initialTime) ? initialTime : US_TIME_FORMAT,
  );

  const [isFieldActive, setIsFieldActive] = useState(value ? true : false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const placeholderText = useMemo(() => {
    if (placeholder) {
      return translate(placeholder || 'fdhsfkdsjhfksdhkf');
    }
    return '';
  }, [placeholder]);
  const labeledText = useMemo(() => {
    if (label) {
      return translate(label || '');
    }
    return '';
  }, [label]);

  const toggleDatePicker = () => {
    if (!isFieldActive) {
      setIsFieldActive(true);
    } else if (isFieldActive && !value) {
      setIsFieldActive(false);
    }
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const getDateTime = selectedDate => {
    let date = new Date(selectedDate).toISOString();
    let newTime = new Date(new Date(date).getTime());
    const hour =
      newTime.getHours() > 12 ? newTime.getHours() - 12 : newTime.getHours();
    const AMOrPM = newTime.getHours() >= 12 ? 'PM' : 'AM';
    let formatedTime = `${hour}:${
      newTime.getMinutes() > 9
        ? newTime.getMinutes()
        : '0' + newTime.getMinutes()
    } ${AMOrPM}`;
    setDatePickerVisibility(false);
    setFieldValue(name, formatedTime);
    getTime(formatedTime);
  };

  return (
    <>
      <Touch onPress={toggleDatePicker} zIndex={1000000}>
        <DateTimePicker
          visible={isDatePickerVisible}
          onCancel={toggleDatePicker}
          getDateTime={getDateTime}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          initialDate={new Date()}
          mode="time"
        />
        <Box>
          <FloatingTextInput
            autoCorrect={false}
            autoCapitalize="none"
            rightIcon="clock"
            placeholder={placeholderText}
            editable={false}
            value={value as string}
            onFocus={toggleDatePicker}
            onRightIconPress={toggleDatePicker}
            containerProps={textInputContainerProps}
            {...props}
          />
        </Box>
      </Touch>
    </>
  );
};
