import React, {useRef} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {EditProfileForm} from './organisms';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useAuth from 'context/Authentication';
import {Image} from 'atoms/Image';
import {profilePlaceholder, editProfileIcon} from 'utils/constant';
import {isAndroid} from 'utils/device';
import {Touch} from 'atoms/Touch';
import {ImagePickerModal} from 'molecules/ImagePickerModal';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {Platform} from 'react-native';

export const EditProfileScreen = () => {
  const sheetRef = useRef(null);
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef?.current.open();
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef?.current.close();
    }
  };
  const getImageUrl = async (image: any) => {
    const token = await hydrate<string>(AUTH_KEYS.token);
    console.log('Values', image.sourceURL);
    const formdata = new FormData();
    formdata.append('token', token);
    formdata.append('user[avatar]', {
      uri:
        Platform.OS === 'android'
          ? image.sourceURL
          : image.sourceURL.replace('file://', ''),
      name: image.filename,
      type: image.mime,
    });
    await editProfileImage(formdata);
    closeSheet();
  };
  const {
    state: {userData, editProfileLoading},
    actions: {editProfile, editProfileImage},
  } = useAuth();
  const initialValues = {
    firstName: `${userData[0].current_user.first_name}`,
    lastName: `${userData[0].current_user.last_name}`,
    email: `${userData[0].current_user.email}`,
    phone: `${userData[0].current_user.phone_number}`,
    addressLine1: `${userData[0].current_user.address_one}`,
    addressLine2: `${userData[0].current_user.address_two}`,
    city: `${userData[0].current_user.city}`,
    state: `${userData[0].current_user.state}`,
    zipcode: `${userData[0].current_user.zip_code}`,
  };
  const handleSubmit = val => {
    const newProfileValue = {
      address_one: val.addressLine1,
      address_two: val.addressLine2,
      city: val.city,
      email: val.email,
      first_name: val.firstName,
      last_name: val.lastName,
      phone_number: val.phone,
      state: val.state,
      zip_code: val.zipcode,
    };
    editProfile(newProfileValue);
  };
  return (
    <Box flex={1}>
      <Navbar showBack title="edit.profile.title" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box alignItems="center" bg="lightBackground" flex={1}>
          <Box
            height={isAndroid ? '7%' : '8%'}
            width="100%"
            bg="primary"
            alignItems="center"
          />
          <Box
            height={150}
            top={isAndroid ? 8 : 15}
            borderWidth={2}
            position="absolute"
            borderColor="greyish"
            borderRadius={80}
            width={150}>
            <Image
              height="100%"
              width="100%"
              borderRadius={80}
              source={
                userData[0].current_user.image_url.length == 0
                  ? profilePlaceholder
                  : {
                      uri: userData[0].current_user.image_url,
                    }
              }
            />
            <Touch
              bg="primary"
              left={isAndroid ? 105 : 105}
              bottom={35}
              borderRadius={50}
              height="20%"
              width="20%"
              zIndex={1000}
              onPress={openSheet}
              justifyContent="center"
              alignItems="center">
              <Image source={editProfileIcon} height={15} width={15} />
            </Touch>
          </Box>
          <EditProfileForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            loading={editProfileLoading}
          />
        </Box>
      </KeyboardAwareScrollView>
      <ImagePickerModal onClickImage={val => getImageUrl(val)} ref={sheetRef} />
    </Box>
  );
};
