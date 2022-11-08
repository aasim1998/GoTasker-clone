import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Formik, FormikHelpers} from 'formik';
import {Button} from 'molecules/Button';
import {
  validateAggregateRequired,
  validateCertificateRequired,
  validatePersonalRequired,
} from 'utils/validators';
import * as yup from 'yup';
import {TextView} from 'atoms/TextView';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import {deviceHeight, isIOS} from 'utils/device';
import {addInsuranceType} from 'typings/addInsurance.type';
import {FormRadioButtonGroup} from 'molecules/FormRadioButtonGroup';
import {InsuranceFormTextInput} from 'molecules/InsuranceFormTextInput';
import dollar from '../../../../assets/images/dollar_currency_symbol.png';
import {Text} from 'atoms/Text';
import {InsuranceModal} from 'molecules/InsuranceModal';

export type FormValues = {
  insurancePersonal: number;
  insuranceAggregate: number;
  insuranceCertificate: string;
  insuranceAddl: boolean;
  insuranceWcel: boolean;
};
const addInsuranceSchema = yup.object().shape({
  insurancePersonal: validatePersonalRequired(),
  insuranceAggregate: validateAggregateRequired(),
  insuranceCertificate: validateCertificateRequired(),
});
type AddInsuranceFormProps = {
  onSubmit(values: FormValues, helpers: FormikHelpers<FormValues>): void;
  loading?: boolean;
  initialValues: addInsuranceType;
};
export const InsuranceScreenForm = ({
  onSubmit,
  loading,
  initialValues,
}: AddInsuranceFormProps) => {
  const [checkedButtonOne, setCheckedButtonOne] = useState(
    initialValues.insuranceAddl,
  );
  const [checkedButtonTwo, setCheckedButtonTwo] = useState(
    initialValues.insuranceWcel,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Box flex={1}>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={addInsuranceSchema}
        enableReinitialize
        onSubmit={onSubmit}>
        {({handleSubmit, errors}) => {
          const errorMessage = Object.values(errors)[0];
          const checkError = val => {
            if (val !== undefined) {
              setIsModalVisible(true);
            } else {
              setIsModalVisible(false);
            }
          };
          const formHandleSubmit = () => {
            handleSubmit();
            checkError(errorMessage);
          };

          return (
            <Box flex={1} mt={deviceHeight < 780 ? 'l' : 'xl'}>
              <InsuranceFormTextInput
                leftImage={dollar}
                name="insurancePersonal"
                title="personal.adv.injury.txt"
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus={false}
              />
              <InsuranceFormTextInput
                leftImage={dollar}
                name="insuranceAggregate"
                title="general.aggregate.txt"
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus={false}
              />
              <InsuranceFormTextInput
                name="insuranceCertificate"
                title="certificate.holder.txt"
                keyboardType="default"
                autoFocus={false}
              />
              <Row mt="-m" alignItems="center">
                <Row mr="m" mt="m">
                  <TextView
                    text="addl.insid.text"
                    color="secondaryGrey"
                    fontSize={16}
                  />
                  <TextView
                    ml="xs"
                    fontSize={16}
                    text="star.text"
                    color="chipRed"
                  />
                </Row>
                <FormRadioButtonGroup
                  name="insuranceAddl"
                  buttonOne="btn.yes.text"
                  buttonTwo="btn.no.text"
                  onCheck={value => setCheckedButtonOne(value)}
                  value={checkedButtonOne}
                />
              </Row>
              <TextView color="secondaryGrey" fontSize={16} pb="s">
                <Text localeId="workers.compensation.and.employers.liability.text" />
                <Text localeId="star.text" color="chipRed" />
              </TextView>
              <Row></Row>
              <Box mt="-s" ml="-s">
                <FormRadioButtonGroup
                  name="insuranceWcel"
                  buttonOne="btn.yes.text"
                  buttonTwo="btn.no.text"
                  onCheck={value => setCheckedButtonTwo(value)}
                  value={checkedButtonTwo}
                />
              </Box>
              <Box
                mb={isIOS ? (deviceHeight < 780 ? 'none' : 'xxl') : '-l'}
                position="absolute"
                zIndex={10}
                width="100%"
                bottom={0}
                shadowColor="shadowYellow"
                shadowOffset={{width: 0, height: 5}}
                shadowOpacity={0.8}
                shadowRadius={2}>
                <Touch onPress={formHandleSubmit}>
                  <Button
                    title="update.text"
                    variant="primary-bold"
                    backgroundColor="lightingYellow"
                    borderColor="lightingYellow"
                    loading={loading}
                    onPress={formHandleSubmit}
                  />
                </Touch>
              </Box>
              <InsuranceModal
                isError={true}
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
    </Box>
  );
};
