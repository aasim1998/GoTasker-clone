import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {PressEvent} from 'typings/utils';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import GlobalVariables, {
  facebook,
  instagram,
  linkedin,
  youtube,
} from 'utils/constant';
import {FormInputNormalTextTitle} from 'molecules/FormInputNormalTextTitle';
import {FormInputMandatoryTextTitle} from 'molecules/FormInputMandatoryTextTitle/FormInputMandatoryTextTitle';
import {SelectInputMandatoryTextTitle} from 'molecules/SelectInputMandatoryTextTitle/SelectInputMandatoryTextTitle';
import {SelectInputTextTitle} from 'molecules/SelectInputTextTitle';

export type FormValues = {
  organizationName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  addressLine2: string;
  instagramLink: string;
  websiteLink: string;
  youtubelink: string;
  facebookLink: string;
  linkedinLink: string;
  primaryService: string;
  secondaryService: string;
};
type LoginScreenFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: any;
};

export const EditOrganizationForm = ({
  onSubmit,
  loading,
  initialValues,
}: LoginScreenFormProps) => {
  const organizationName = useRef<any>();
  const email = useRef<any>();
  const phone = useRef<any>();
  const addressLine1 = useRef<any>();
  const addressLine2 = useRef<any>();
  const instagramLink = useRef<any>();
  const websiteLink = useRef<any>();
  const youtubelink = useRef<any>();
  const facebookLink = useRef<any>();
  const linkedinLink = useRef<any>();
  const city = useRef<any>();
  const zipcode = useRef<any>();
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}>
      {({handleSubmit, setFieldValue}) => {
        return (
          <Box width="90%" mt="XXXL" bg="lightBackground">
            <FormInputMandatoryTextTitle
              name="organizationName"
              title="organisation.name"
              reference={organizationName}
            />
            <FormInputMandatoryTextTitle
              name="email"
              title="profile.email"
              reference={email}
            />
            <FormInputMandatoryTextTitle
              name="phone"
              keyboardType="number-pad"
              maxLength={10}
              title="profile.phone"
              reference={phone}
            />
            <FormInputMandatoryTextTitle
              name="addressLine1"
              title="profile.address.line1"
              reference={addressLine1}
            />
            <FormInputNormalTextTitle
              name="addressLine2"
              title="profile.address.line2"
              reference={addressLine2}
            />
            <FormInputNormalTextTitle
              name="websiteLink"
              title="website.optional.link"
              renderLeft={'https://'}
              reference={websiteLink}
            />
            <FormInputNormalTextTitle
              name="linkedinLink"
              title="linkedin.link"
              renderLeft={linkedin}
              reference={linkedinLink}
            />
            <FormInputNormalTextTitle
              name="facebookLink"
              title="facebook.link"
              renderLeft={facebook}
              reference={facebookLink}
            />
            <FormInputNormalTextTitle
              name="instagramLink"
              title="instagram.link"
              renderLeft={instagram}
              reference={instagramLink}
            />
            <FormInputNormalTextTitle
              name="youtubelink"
              title="youtube.link"
              renderLeft={youtube}
              reference={youtubelink}
            />
            <SelectInputMandatoryTextTitle
              title="primary.service"
              name="primaryService"
              options={GlobalVariables.serviceList}
              placeholder={initialValues.primaryService}
              onChange={val => setFieldValue('primaryService', val.name)}
            />
            <SelectInputTextTitle
              title="secondary.service"
              name="secondaryService"
              placeholder={initialValues.secondaryService}
              options={GlobalVariables.serviceList}
              onChange={val => setFieldValue('secondaryService', val.name)}
            />
            <FormInputMandatoryTextTitle
              name="city"
              title="profile.city"
              reference={city}
              maxLength={50}
            />
            <Row
              width="100%"
              justifyContent="space-between"
              alignItems="center">
              <Box width="40%">
                <SelectInputMandatoryTextTitle
                  title="profile.state"
                  name="state"
                  placeholder={initialValues.state}
                  options={GlobalVariables.stateList}
                  onChange={val => setFieldValue('state', val.name)}
                />
              </Box>
              <Box width="40%" height="100%">
                <FormInputMandatoryTextTitle
                  name="zipcode"
                  title="profile.zipcode"
                  reference={zipcode}
                  maxLength={6}
                  keyboardType="number-pad"
                />
              </Box>
            </Row>
            <Touch height="5%" width="100%" justifyContent="center">
              <Button
                title="save.text"
                variant="yellowPrimary"
                onPress={handleSubmit as PressEvent}
                loading={loading}
              />
            </Touch>
            <Box height={80} />
          </Box>
        );
      }}
    </Formik>
  );
};
