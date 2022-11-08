import React, {useCallback} from 'react';
import {useField} from 'formik';
import {Merge} from 'typings/utils';
import {TextInputWithoutHelper, TextInputWithoutHelperProps} from 'atoms/TextInputWithoutHelper';
import {TextInput as RNTextInput} from 'react-native';
import {LocaleString} from 'locales/en';
import theme from 'styles/theme';

type InternalFormTextInputProps = {
  name: string;
  rightIconColor?: string;
  placeholder?: LocaleString | string;
  nextInputRef?: React.MutableRefObject<RNTextInput> | null;
};

export type FormTextInputWithoutHelperProps = Merge<
  Partial<TextInputWithoutHelperProps>,
  InternalFormTextInputProps
>;

export const FormTextInputWithoutHelper = React.forwardRef<RNTextInput, FormTextInputWithoutHelperProps>(
  (
    {name, placeholder, nextInputRef, rightIcon, rightIconColor, ...props},
    ref,
  ) => {
    const [field, meta, helpers] = useField(name as any);
    const error = meta.touched && meta.error;
    const handleBlur = useCallback(() => {
      helpers.setTouched(true);
    }, [helpers]);
    const handleSubmitEditing = useCallback(() => {
      nextInputRef?.current?.focus();
    }, [nextInputRef]);
    return (
      <TextInputWithoutHelper
        height={50}
        borderRadius={5}
        ref={ref as any}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder={placeholder}
        variant={error ? 'error' : undefined}
        errorMessage={error}
        value={field.value}
        borderColor={'textInputBorderColor'}
        onChangeText={field.onChange(name) as any}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmitEditing}
        rightIcon={rightIcon}
        rightIconColor={rightIconColor}
        placeholderTextColor={theme.colors.textInputBorderColor}
        {...props}
      />
    );
  },
);
