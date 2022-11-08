import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {FormValues, ForgotPasswordForm} from './organisms';
import {Navbar} from 'molecules/Navbar';
import {Image} from 'atoms/Image';
import {TextView} from 'atoms/TextView';
import useAuth from 'context/Authentication';
import {fcmService} from 'utils/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight} from 'utils/device';
import {SuccessModal} from 'molecules/SuccessModal';
import {navigate} from 'services/NavigationService';

export const ForgotPassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [userFcmToken, setUserFcmToken] = useState('');
  const {
    state: {forgotPasswordLoading, forgotPasswords},
    actions: {forgotPassword},
  } = useAuth();

  const handleSubmit = (values: FormValues) => {
    const ForgotPasswordInputs = {
      password: {
        email: values.email,
      },
    };
    forgotPassword(ForgotPasswordInputs, openModal);
  };
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
  }, []);
  const onRegister = async fcmToken => {
    setUserFcmToken(fcmToken);
  };
  const onNotification = notification => {};
  const onOpenNotification = notification => {};
  const openModal = (Message: string) => {
    setIsModalVisible(true);
    setSuccessMessage(Message);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    navigate('LoginScreen');
  };

  return (
    <Box>
      <Navbar showBack title="title.forgot.password" />
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}>
        <Box height={deviceHeight}>
          <Box top={60} justifyContent="center" alignItems="center">
            <Image
              source={require('images/forgot_password.png')}
              width={95}
              height={95}
            />
          </Box>
          <Box top={100} alignItems="center" justifyContent="center">
            <TextView
              text="forgot.password.heading"
              variant="headline"
              color="greyTextPrimary"
            />
            <TextView
              text="forgot.password.subheading"
              variant="headline"
              color="greyTextPrimary"
            />
            <TextView
              text="forgot.password.text"
              variant="headline"
              color="greyTextPrimary"
            />
            <Box mt="m" alignItems="center" justifyContent="center">
              <ForgotPasswordForm
                onSubmit={handleSubmit}
                loading={forgotPasswordLoading}
              />
            </Box>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
      <SuccessModal
        isModalVisible={isModalVisible}
        localeID={successMessage}
        onCloseModal={closeModal}
        showTitle={true}
      />
    </Box>
  );
};
