import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {FormValues, InsuranceScreenForm} from './organism/InsuranceScreenForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import useProfile from 'context/ProfileApi';
import {InsuranceModal} from 'molecules/InsuranceModal';
import {AUTH_KEYS, hydrate} from 'utils/storage';

export const InsuranceScreen = () => {
  const {
    state: {updateInsuranceLoading},
    actions: {updateInsurance},
  } = useProfile();
  const [insuranceData, setInsuranceData] = useState<any>();
  const [insuranceModalVisible, setInsuranceModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async (values: FormValues) => {
    const data = {
      addl: values.insuranceAddl,
      certificate_holder: values.insuranceCertificate,
      ga: values.insuranceAggregate,
      pa_insure: values.insurancePersonal,
      wcel: values.insuranceWcel,
    };
    await updateInsurance(data, openInsuranceModal, insuranceData.id);
  };
  const openInsuranceModal = (Message: string) => {
    setInsuranceModalVisible(true);
    setMessage(Message);
  };
  const closeInsuranceModal = () => {
    setInsuranceModalVisible(false);
  };
  useEffect(() => {
    const getInsuranceData = async () => {
      const data = await hydrate(AUTH_KEYS.insurance);
      await setInsuranceData(data);
    };
    getInsuranceData();
  }, []);
  const initialValues = {
    insurancePersonal: insuranceData?.pa_insure || '',
    insuranceAggregate: insuranceData?.ga || '',
    insuranceCertificate: insuranceData?.certificate_holder || '',
    insuranceAddl: insuranceData?.addl.toString() || 'true',
    insuranceWcel: insuranceData?.wcel.toString() || 'true',
  };

  return (
    <Box height="100%" bg="whiteText">
      <Navbar title="insurance.text" showBack />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}>
        <Box height={deviceHeight - 110} m="l" mt="-s">
          <InsuranceScreenForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={updateInsuranceLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
      <InsuranceModal
        isModalVisible={insuranceModalVisible}
        onCloseModal={closeInsuranceModal}
        localeID={message}
      />
    </Box>
  );
};
