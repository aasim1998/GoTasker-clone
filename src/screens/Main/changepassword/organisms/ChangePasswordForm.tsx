import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {FormPasswordInput} from 'molecules/FormPasswordInput';
import {TextView} from 'atoms/TextView';
import theme from 'styles/theme';
import {Touch} from 'atoms/Touch';
import * as yup from 'yup';
import {validateConfirmPassword, validateNewPassword} from 'utils/validators';

export type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
};
type LoginScreenFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
};
const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmedPassword: '',
};

const changePasswordSchema = yup.object().shape({
  confirmedPassword: validateNewPassword().oneOf(
    [yup.ref('newPassword'), 'password'],
    'validation.password.should.be.same.new',
  ),
  newPassword: validateConfirmPassword().when('oldPassword', {
    is: (val: string) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .notOneOf(
        [yup.ref('oldPassword')],
        'validation.password.should.not.be.same.current',
      ),
  }),
});

export const ChangePasswordForm = ({
  onSubmit,
  loading,
}: LoginScreenFormProps) => {
  const oldPassword = useRef<any>();
  const newPassword = useRef<any>();
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={changePasswordSchema}>
      {({handleSubmit}) => {
        return (
          <Box>
            <TextView
              mb="xm"
              text="old.password.text"
              variant="boldTitle"
              color="black"
            />
            <FormPasswordInput
              textAlign="left"
              color="black"
              name="oldPassword"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              rightIconColor={theme.colors.primary}
              onSubmitEditing={() => oldPassword.current.focus()}
            />

            <TextView
              mb="xm"
              text="new.password.text"
              variant="boldTitle"
              color="black"
            />
            <FormPasswordInput
              textAlign="left"
              color="black"
              name="newPassword"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              rightIconColor={theme.colors.primary}
              onSubmitEditing={() => newPassword.current.focus()}
              ref={oldPassword}
            />
            <TextView
              mb="xm"
              text="new.password.confirm.text"
              variant="boldTitle"
              color="black"
            />
            <FormPasswordInput
              textAlign="left"
              color="black"
              name="confirmedPassword"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              ref={newPassword}
              rightIconColor={theme.colors.primary}
              returnKeyType="done"
            />
            <Touch height="17%" width="100%" justifyContent="center">
              <Button
                title="changepassword.button.title"
                variant="yellowPrimary"
                onPress={handleSubmit as PressEvent}
              />
            </Touch>
          </Box>
        );
      }}
    </Formik>
  );
};
