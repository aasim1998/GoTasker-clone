import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {TextView} from 'atoms/TextView';
import {FormTextInput} from 'molecules/FormTextInput';
import {Row} from 'atoms/Row';
import {MandatoryText} from 'atoms/MandatoryText';
import {Touch} from 'atoms/Touch';
import * as yup from 'yup';
import {validateRequiredMessage} from 'utils/validators';
import GlobalVariables from 'utils/constant';
import {FormSelectInput} from 'molecules/FormSelectInput';

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  addressLine2: string;
};
type LoginScreenFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: any;
};

export const EditProfileForm = ({
  onSubmit,
  loading,
  initialValues,
}: LoginScreenFormProps) => {
  const firstName = useRef<any>();
  const lastName = useRef<any>();
  const email = useRef<any>();
  const phone = useRef<any>();
  const addressLine1 = useRef<any>();
  const addressLine2 = useRef<any>();
  const city = useRef<any>();
  const zipcode = useRef<any>();
  const editProfileSchema = yup.object({
    firstName: validateRequiredMessage(),
    email: validateRequiredMessage(),
    addressLine1: validateRequiredMessage(),
    city: validateRequiredMessage(),
    state: validateRequiredMessage(),
    zipcode: validateRequiredMessage(),
  });
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
      validationSchema={editProfileSchema}>
      {({handleSubmit, setFieldValue}) => {
        return (
          <Box width="90%" mt="XXL">
            <MandatoryText
              color="black"
              mb="xm"
              text="profile.first.name"
              variant="boldTitle"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="firstName"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              onSubmitEditing={() => firstName.current.focus()}
            />

            <TextView
              mb="xm"
              text="profile.last.name"
              variant="boldTitle"
              color="black"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="lastName"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              onSubmitEditing={() => lastName.current.focus()}
            />
            <MandatoryText
              color="black"
              mb="xm"
              text="profile.email"
              variant="boldTitle"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="email"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              onSubmitEditing={() => email.current.focus()}
            />
            <TextView
              mb="xm"
              text="profile.phone"
              variant="boldTitle"
              color="black"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="phone"
              borderRadius={7}
              backgroundColor="transparent"
              keyboardType="number-pad"
              textAlignVertical="top"
              onSubmitEditing={() => phone.current.focus()}
            />
            <MandatoryText
              color="black"
              mb="xm"
              text="profile.address.line1"
              variant="boldTitle"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="addressLine1"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              onSubmitEditing={() => addressLine1.current.focus()}
            />
            <TextView
              color="black"
              mb="xm"
              text="profile.address.line2"
              variant="boldTitle"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="addressLine2"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              onSubmitEditing={() => addressLine2.current.focus()}
            />
            <MandatoryText
              mb="xm"
              text="profile.city"
              variant="boldTitle"
              color="black"
            />
            <FormTextInput
              color="black"
              textAlign="left"
              name="city"
              borderRadius={7}
              backgroundColor="transparent"
              textAlignVertical="top"
              onSubmitEditing={() => city.current.focus()}
            />
            <Row
              width="100%"
              justifyContent="space-between"
              alignItems="center">
              <Box width="40%">
                <MandatoryText
                  color="black"
                  mb="xm"
                  text="profile.state"
                  variant="boldTitle"
                />
                <FormSelectInput
                  name="state"
                  options={GlobalVariables.stateList}
                  placeholder={initialValues.state}
                  handleOnChange={val => setFieldValue('state', val.name)}
                />
              </Box>
              <Box width="40%" height="100%">
                <MandatoryText
                  color="black"
                  mb="xm"
                  text="profile.zipcode"
                  variant="boldTitle"
                  maxLength={6}
                />
                <FormTextInput
                  color="black"
                  textAlign="left"
                  width="100%"
                  name="zipcode"
                  borderRadius={7}
                  backgroundColor="transparent"
                  textAlignVertical="top"
                  onSubmitEditing={() => zipcode.current.focus()}
                />
              </Box>
            </Row>
            <Touch height="7%" width="100%" justifyContent="center">
              <Button
                title="save.text"
                variant="yellowPrimary"
                onPress={handleSubmit as PressEvent}
                loading={loading}
              />
            </Touch>
            <Box height={180} />
          </Box>
        );
      }}
    </Formik>
  );
};
