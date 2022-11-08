import React, {useCallback, useState} from 'react';
import {useField} from 'formik';
import {TextInputProps} from 'atoms/TextInput';
import {Merge} from 'typings/utils';
import {TextInput as RNTextInput} from 'react-native';
import {IconProps} from 'atoms/Icon';
import {Box} from 'atoms/Box';
import { FormTextInputWithoutHelper } from 'molecules/FormTextInputWithoutHelper';

type InternalFormTextInputWithoutHelperProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  rightIconColor?: string;
  iconClose?: IconProps['name'];
  iconOpen?: IconProps['name'];
  nextInputRef?: React.MutableRefObject<RNTextInput> | null;
};
export type FormTextInputWithoutHelperProps = Merge<
  Partial<TextInputProps>,
  InternalFormTextInputWithoutHelperProps
>;
export const FormPasswordInputWithoutHelper = React.forwardRef<
  RNTextInput,
  FormTextInputWithoutHelperProps
>(
  (
    {
      name ,
      label,
      placeholder,
      iconClose ,
      iconOpen ,
      nextInputRef,
      rightIconColor,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [field, meta, helpers] = useField(name as any);
    const error = meta.touched && meta.error;
    const toggleIsVisible = () => {
      setIsVisible(!isVisible);
    };
    const handleBlur = useCallback(() => {
      helpers.setTouched(true);
    }, [helpers]);
    const handleSubmitEditing = useCallback(() => {
      nextInputRef?.current?.focus();
    }, [nextInputRef]);
    return (
      <Box>
        <FormTextInputWithoutHelper
          ref={ref as any}
          name={name}
          maxLength={50}
          secureTextEntry={!isVisible}
          rightIconSize={20}
          autoCorrect={false}
          autoCapitalize="none"
          rightIcon={isVisible ? iconOpen : iconClose}
          errorMessage={error}
          variant={error ? 'error' : undefined}
          onRightIconPress={toggleIsVisible}
          placeholder={placeholder}
          value={field.value}
          onChangeText={field.onChange(name) as any}
          onBlur={handleBlur}
          returnKeyType="done"
          rightIconColor={rightIconColor}
          onSubmitEditing={handleSubmitEditing}
          {...props}
        />
      </Box>
    );
  },
);
FormPasswordInputWithoutHelper.defaultProps = {
  name: 'password',
  label: 'user.password',
  iconClose : 'eye-blocked',
  iconOpen : 'eye',
};
