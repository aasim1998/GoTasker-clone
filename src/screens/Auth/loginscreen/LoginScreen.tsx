import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {FormValues, LoginScreenForm} from './organisms';
import {useAuth} from 'context/Authentication';
import {fcmService} from 'utils/firebase';
import {TextButton} from 'atoms/TextButton';
import {Touch} from 'atoms/Touch';
import {ErrorModal} from 'molecules/ErrorModal';
import {Image, ImageBase} from 'atoms/Image';
import background from '../../../assets/images/background.png';
import {deviceHeight, isIOS} from 'utils/device';
import logo from '../../../assets/images/ic_logo.png';
import {KeyboardAvoidingView} from 'react-native';

export const LoginScreen = () => {
  const [userFcmToken, setUserFcmToken] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    state: {loginLoading},
    actions: {login},
  } = useAuth();

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
  }, []);
  const onRegister = fcmToken => {
    setUserFcmToken(fcmToken);
  };
  const onNotification = notification => {};
  const onOpenNotification = notification => {};
  const handleSubmit = (values: FormValues) => {
    const {email, password} = values;
    const loginInputs = {
      user: {
        email: email,
        token: userFcmToken,
        password: password,
      },
    };
    login(loginInputs, openModal);
  };
  const openModal = (Message: string) => {
    setIsModalVisible(true);
    setErrorMessage(Message);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <Box flex={1}>
      <ImageBase
        height="100%"
        width="100%"
        source={background}
        position="absolute"
      />
      <KeyboardAvoidingView>
        <Box height={deviceHeight * 0.9}>
          <Box mt="XXL" width="100%" alignItems="center">
            <Image
              source={logo}
              height={150}
              width={150}
              mb={isIOS ? 'xl' : 'l'}
            />
            <LoginScreenForm onSubmit={handleSubmit} loading={loginLoading} />
          </Box>
        </Box>
      </KeyboardAvoidingView>
      <Touch
        mt={deviceHeight < 780 ? 'l' : 'xxl'}
        onPress={() => {}}
        alignSelf="center">
        <TextButton
          localeId="show.product.tour"
          textDecorationLine="underline"
          fontSize={16}
          color={isIOS ? 'lightingYellow' : 'white'}
        />
      </Touch>
      <ErrorModal
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
        localeID={errorMessage}
      />
    </Box>
  );
};
