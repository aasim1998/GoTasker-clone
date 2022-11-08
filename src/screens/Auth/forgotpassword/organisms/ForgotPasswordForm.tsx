import React from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {FormTextInput} from 'molecules/FormTextInput';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import * as yup from 'yup';
import {validateRequiredEmail} from 'utils/validators';
import {TextView} from 'atoms/TextView';

export type FormValues = {
  email: string;
};
type ForgotPasswordProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
};
const initialValues = {
  email: '',
};
const ForgotPasswordSchema = yup.object().shape<any>({
  email: validateRequiredEmail(),
});
export const ForgotPasswordForm = ({
  onSubmit,
  loading,
}: ForgotPasswordProps) => {
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={ForgotPasswordSchema}>
      {({handleSubmit}) => {
        return (
          <Box mt="XL" pt="XXL" width="100%" position="absolute">
            <Box mt="XXXL" ml="xxl" mr="xxl">
              <TextView
                mb="s"
                text="email.login"
                color="greyTextPrimary"
                variant="boldTitle"
              />
              <FormTextInput
                textAlign="left"
                name="email"
                borderRadius={7}
                borderColor="greyPrimary"
                backgroundColor="transparent"
                color="black"
              />
            </Box>
            <Box mt="s" ml="xxl" mr="xxl">
              <Button
                title="forgot.password.button"
                backgroundColor="yellowButton"
                borderColor="whitePrimary"
                borderRadius={7}
                loading={loading}
                variant="primary-round"
                onPress={handleSubmit as PressEvent}
              />
            </Box>
          </Box>
        );
      }}
    </Formik>
  );
};
