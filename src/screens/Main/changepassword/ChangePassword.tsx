import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Image} from 'atoms/Image';
import {ChangePasswordForm} from './organisms';
import {TextView} from 'atoms/TextView';
import {ChangePasswordIcon} from 'utils/constant';
import useAuth from 'context/Authentication';
import {ChangePasswordModal} from 'molecules/ChangePasswordModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {deviceHeight, isAndroid} from 'utils/device';

export const ChangePassword = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [minimumLength, setminimumLength] = useState(false);
  const [NewPasswordBlank, setNewPasswordBlank] = useState(false);
  const {
    state: {userData},
    actions: {changePassword},
  } = useAuth();
  const handleSubmit = values => {
    const updatedValue = {
      token: userData[0].token,
      user: {
        confirm_password: `${values.confirmedPassword}`,
        old_password: `${values.oldPassword}`,
        password: `${values.newPassword}`,
      },
    };
    values.oldPassword.length === 0
      ? (setmodalVisible(!modalVisible), setminimumLength(false))
      : values.newPassword.length === 0 || values.confirmedPassword.length === 0
      ? (setmodalVisible(!modalVisible), setNewPasswordBlank(true))
      : (values.oldPassword.length < 8 && values.oldPassword.length !== 0) ||
        values.newPassword.length < 8 ||
        values.confirmedPassword.length < 8
      ? (setmodalVisible(!modalVisible), setminimumLength(true))
      : changePassword(updatedValue);
  };
  return (
    <Box height={deviceHeight} bg="whiteText">
      <Navbar title="change.password.title" showBack />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}>
        <Box height={deviceHeight} pt="m">
          <Box
            height={isAndroid ? '21%' : '20%'}
            py="s"
            width="80%"
            alignSelf="center"
            alignItems="center">
            <Image
              source={ChangePasswordIcon}
              height={isAndroid ? '100%' : '100%'}
              width={isAndroid ? '40%' : '50%'}
            />
          </Box>
          <Box px="mll">
            <Box width="90%" justifyContent="center" alignItems="center">
              <TextView
                text="update.password.screen.text"
                variant="semiBold"
                textAlign="center"
                color="darkText"
              />
            </Box>
            <Box width="100%" height="100%" pt="m">
              <ChangePasswordForm onSubmit={handleSubmit} loading={false} />
            </Box>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
      <ChangePasswordModal
        isModalVisible={modalVisible}
        onBackdropPress={() => setmodalVisible(!modalVisible)}
        minimumLength={minimumLength}
        newPasswordBlank={NewPasswordBlank}
      />
    </Box>
  );
};
