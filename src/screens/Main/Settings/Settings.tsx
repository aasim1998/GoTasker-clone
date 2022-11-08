import React, {useState} from 'react';
import {Box} from 'atoms/Box';
import {Divider} from 'atoms/Divider';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';
import {TextButton} from 'atoms/TextButton';
import {navigate} from 'services/NavigationService';
import useAuth from 'context/Authentication';
import {LogoutModal} from 'molecules/LogoutModal';
import {SwitchText} from 'molecules/SwitchText';

export const Settings = () => {
  const {
    state: {userData},
    actions: {getNotifications, setUserInfo, getSms, getEmail, getProductTour},
  } = useAuth();
  const [modalVisible, setmodalVisible] = useState(false);
  const [NotificationOn, setNotificationOn] = useState(
    userData[0]?.current_user?.push_notifications_enabled,
  );
  const [EmailOn, setEmailOn] = useState(
    userData[0]?.current_user?.email_notifications_enabled,
  );
  const [SMSOn, setSMSOn] = useState(
    userData[0]?.current_user?.sms_notifications_enabled,
  );
  const [TourOn, setTourOn] = useState(userData[0]?.current_user?.product_tour);

  const handleNotification = () => {
    setNotificationOn(NotificationOn => !NotificationOn);
    const result = {token: userData[0]?.token, key: !NotificationOn};
    getNotifications(result).then(res => {
      if (res.status_code === 200) {
        const obj = userData[0].current_user;
        const updatedObj = {
          ...obj,
          push_notifications_enabled: res.data[0].notification_enabled,
        };
        userData[0].current_user = updatedObj;
        setUserInfo(userData[0]?.token, userData);
      }
    });
  };

  const handleSMS = () => {
    setSMSOn(SMSOn => !SMSOn);
    const result = {token: userData[0]?.token, key: !SMSOn};
    getSms(result).then(res => {
      if (res.status_code === 200) {
        const obj = userData[0].current_user;
        const updatedObj = {
          ...obj,
          sms_notifications_enabled: res.data[0].sms_notifications_enabled,
        };
        userData[0].current_user = updatedObj;
        setUserInfo(userData[0]?.token, userData);
      }
    });
  };
  const handleEmail = () => {
    setEmailOn(EmailOn => !EmailOn);
    const result = {token: userData[0]?.token, key: !EmailOn};
    getEmail(result).then(res => {
      if (res.status_code === 200) {
        const obj = userData[0].current_user;
        const updatedObj = {
          ...obj,
          email_notifications_enabled: res.data[0].email_notifications_enabled,
        };
        userData[0].current_user = updatedObj;
        setUserInfo(userData[0]?.token, userData);
      }
    });
  };
  const handleTour = () => {
    setTourOn(TourOn => !TourOn);
    const result = {token: userData[0]?.token, key: !TourOn};
    getProductTour(result).then(res => {
      if (res.status_code === 200) {
        const obj = userData[0].current_user;
        const updatedObj = {
          ...obj,
          product_tour: res.data[0].product_tour,
        };
        userData[0].current_user = updatedObj;
        setUserInfo(userData[0]?.token, userData);
      }
    });
  };
  const handleTerms = () => {
    navigate('TermsAndCondition');
  };
  const handlePrivacy = () => {
    navigate('PrivacyPolicy');
  };
  const handleFrequently = () => {
    navigate('FAQs');
  };
  const handleLogout = () => {
    setmodalVisible(!modalVisible);
  };
  const handleChangePassword = () => {
    navigate('ChangePassword');
  };
  return (
    <Box>
      <Navbar title="settings.text" showBack />
      <Box bg="whiteText" height="100%" py="s" m="-s">
        <SwitchText
          name="enable.notification"
          value={NotificationOn}
          onToggle={handleNotification}
        />
        <SwitchText name="enable.sms" value={SMSOn} onToggle={handleSMS} />
        <SwitchText
          name="enable.email"
          value={EmailOn}
          onToggle={handleEmail}
        />
        {/* <Text
          localeId="enable.haptic"
          variant="bodyLight"
          py="s"
          px="m"
          color="darkText"
        /> */}
        <SwitchText name="enable.tour" value={TourOn} onToggle={handleTour} />
        <TextButton
          color="darkText"
          localeId="change.pass"
          variant="bodyLight"
          py="m"
          px="m"
          onPress={handleChangePassword}
        />
        <Divider height={1} width="100%" />
        <Text
          localeId="account.settings"
          variant="title"
          py="m"
          px="m"
          color="darkText"
        />
        <Divider height={1} width="100%" />
        <TextButton
          color="darkText"
          py="m"
          px="m"
          localeId="terms.service"
          variant="bodyLight"
          onPress={handleTerms}
        />
        <Divider height={1} width="100%" />
        <TextButton
          color="darkText"
          py="m"
          px="m"
          localeId="privacy.policy"
          variant="bodyLight"
          onPress={handlePrivacy}
        />
        <Divider height={1} width="100%" />
        <TextButton
          color="darkText"
          py="m"
          px="m"
          localeId="faq.text"
          variant="bodyLight"
          onPress={handleFrequently}
        />
        <Divider height={1} width="100%" />
        <TextButton
          color="darkText"
          localeId="logout.text"
          variant="title"
          py="m"
          px="m"
          onPress={handleLogout}
        />
        <Divider height={1} width="100%" />
        <Text textAlign="center" localeId="versn.text" color="darkText" />
      </Box>
      <LogoutModal
        isModalVisible={modalVisible}
        onBackdropPress={() => setmodalVisible(!modalVisible)}
      />
    </Box>
  );
};
