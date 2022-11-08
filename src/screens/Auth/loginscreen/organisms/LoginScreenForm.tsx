import React, { useState } from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import * as yup from 'yup';
import {TextButton} from 'atoms/TextButton';
import {
  validateRequiredEmail,
  validateRequiredPassword,
} from 'utils/validators';
import {Touch} from 'atoms/Touch';
import {TextView} from 'atoms/TextView';
import {navigate} from 'services/NavigationService';
import { ErrorModal } from 'molecules/ErrorModal';
import { FormTextInputWithoutHelper } from 'molecules/FormTextInputWithoutHelper';
import { FormPasswordInputWithoutHelper } from 'molecules/FormPasswordInputWithoutHelper';

export type FormValues = {
  email: string;
  password: string;
};
type LoginScreenFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
};
const initialValues = {
  email: '',
  password: '',
};
const loginScreenSchema = yup.object().shape<any>({
  email: validateRequiredEmail(),
  password: validateRequiredPassword(),
});
export const LoginScreenForm = ({onSubmit, loading}: LoginScreenFormProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={loginScreenSchema}>
      {({handleSubmit, errors}) => {
        const errorMessage = Object.values(errors)[0]
        const checkError = val => {
          if (val !== undefined) {
            setIsModalVisible(true);
          } else {
            setIsModalVisible(false);
          }
        };
        const formHandleSubmit = () =>{
          handleSubmit();
          checkError(errorMessage);
        }
        return (
          <Box width="100%">
            <Box mx="xxl">
              <TextView
                mb="s"
                text="email.login"
                color="whitePrimary"
                variant="boldTitle"
              />
              <FormTextInputWithoutHelper
                textAlign="left"
                name="email"
                borderRadius={7}
                borderColor="whitePrimary"
                backgroundColor="transparent"
                color="white"
                fontWeight="700"
              />
              <TextView
                pt="m"
                mb="s"
                text="password.login"
                color="whitePrimary"
                variant="boldTitle"
              />
              <FormPasswordInputWithoutHelper
                textAlign="left"
                name="password"
                borderRadius={7}
                backgroundColor="transparent"
                borderColor="whitePrimary"
                color="white"
                fontWeight="700"
              />
            </Box>
            <Box mr="xxl" pt="m" alignItems="flex-end">
              <Touch onPress={() => navigate('ForgotPassword')}>
                <TextButton
                  textDecorationLine="underline"
                  localeId="forgot.password"
                  variant="subTitle"
                  color="whitePrimary"
                />
              </Touch>
            </Box>
            <Box mt="l" ml="xxl" mr="xxl">
              <Button
                title="login.screen.button"
                backgroundColor="buttonBlue"
                borderColor="transparent"
                borderRadius={7}
                loading={loading}
                variant="primary"
                 onPress={formHandleSubmit}
              />
            </Box>
            <ErrorModal
                isModalVisible={isModalVisible}
                onCloseModal={() => setIsModalVisible(false)}
                localeID={
                  errorMessage === undefined
                    ? 'common.error.message'
                    : errorMessage
                }
              />
          </Box>
        );
      }}
    </Formik>
  );
};
