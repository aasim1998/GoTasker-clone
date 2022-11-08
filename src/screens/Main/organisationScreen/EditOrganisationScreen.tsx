import React, {useEffect, useRef, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {EditOrganizationForm} from './organisms';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useAuth from 'context/Authentication';
import {Image} from 'atoms/Image';
import GlobalVariables, {
  profilePlaceholder,
  editProfileIcon,
} from 'utils/constant';
import {isAndroid} from 'utils/device';
import {Touch} from 'atoms/Touch';
import {ImagePickerModal} from 'molecules/ImagePickerModal';
import {OrganizationModal} from 'molecules/OrganizationModal';
import {goBack} from 'services/NavigationService';
import {AUTH_KEYS, hydrate} from 'utils/storage';
import {ErrorModal} from 'molecules/ErrorModal';
import {onlyNumber, validEmail} from 'utils/validators';
import {Platform} from 'react-native';

export const EditOrganisationScreen = () => {
  const [organizationModalVisible, setOrganizationModalVisible] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateAdress, setUpdateAddress] = useState(false);
  useEffect(() => {
    setUpdateAddress(false);
  }, []);
  const sheetRef = useRef(null);
  const {
    state: {userData, editOrganization},
    actions: {editOrganizationDetail, editOrganizationLogo},
  } = useAuth();
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
    const formdata = new FormData();
    formdata.append('token', token);
    formdata.append('organizations[logo]', {
      uri:
        Platform.OS === 'android'
          ? image.sourceURL
          : image.sourceURL.replace('file://', ''),
      name: image.filename,
      type: image.mime,
    });
    await editOrganizationLogo(
      formdata,
      userData[0].current_organizations[0].id,
    );
    closeSheet();
  };
  const initialValues = {
    organizationName: `${userData[0].current_organizations[0].name}`,
    email: `${userData[0].current_organizations[0].email}`,
    phone: `${userData[0].current_organizations[0].phone_no}`,
    primaryService: `${userData[0].current_organizations[0].primary_service}`,
    secondaryService: `${userData[0].current_organizations[0].secondary_service}`,
    addressLine1: `${userData[0].current_organizations[0].address_one}`,
    addressLine2: `${userData[0].current_organizations[0].address_two}`,
    city: `${userData[0].current_organizations[0].city}`,
    state: `${userData[0].current_organizations[0].state}`,
    zipcode: `${userData[0].current_organizations[0].zip_code}`,
    websiteLink: `${
      userData[0].current_organizations[0].website_url.startsWith('https://')
        ? userData[0].current_organizations[0].website_url.slice(
            8,
            userData[0].current_organizations[0].website_url.length,
          )
        : userData[0].current_organizations[0].website_url
    }`,
  };

  const handleSubmit = async val => {
    const newProfileValue = {
      address_one: val.addressLine1,
      address_two: val.addressLine2,
      city: val.city,
      email: val.email,
      name: val.organizationName,
      phone_no: val.phone,
      primary_service: val.primaryService,
      secondary_service: val.secondaryService,
      state: val.state,
      website_url: val.websiteLink,
      zip_code: val.zipcode,
      facebook_url: val.facebookLink,
      instagram_url: val.instagramLink,
      linkedin_url: val.linkedinLink,
      youtube_url: val.youtubelink,
    };
    val.addressLine1.length === 0 ||
    val.city.length === 0 ||
    val.email.length === 0 ||
    val.phone.length === 0 ||
    val.organizationName.length === 0 ||
    val.zipcode.length === 0
      ? (setIsModalVisible(!isModalVisible),
        setErrorMessage(`${GlobalVariables.organizationErrorMessage}`),
        console.log('Empty'))
      : !val.email.match(validEmail)
      ? (setIsModalVisible(!isModalVisible),
        setErrorMessage(
          `Email ${GlobalVariables.organizationValidErrorMessage}`,
        ),
        console.log('Invalid Email'))
      : !val.phone.match(onlyNumber) || !val.zipcode.match(onlyNumber)
      ? (setIsModalVisible(!isModalVisible),
        setErrorMessage(
          `Phone/Zipcode ${GlobalVariables.organizationValidErrorMessage}`,
        ),
        console.log('Invalid Phone'))
      : setTimeout(() => {
          setUpdateAddress(true);
        }, 5000);

    if (updateAdress) {
      var response = await editOrganizationDetail(newProfileValue);
      response?.status === GlobalVariables.successString
        ? setOrganizationModalVisible(!organizationModalVisible)
        : response?.status === GlobalVariables.failure
        ? (setIsModalVisible(!isModalVisible),
          setErrorMessage(`${response?.error?.error_messages[0]}`))
        : null;
    }
  };
  return (
    <Box flex={1} bg="lightBackground">
      <Navbar showBack={() => goBack()} title="organization.title" />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid>
        <Box alignItems="center" flex={1} bg="lightBackground">
          <Box
            height={isAndroid ? 85 : 90}
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
                userData[0].current_organizations[0].logo.length == 0
                  ? profilePlaceholder
                  : {
                      uri: userData[0].current_organizations[0].logo,
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
          <EditOrganizationForm
            loading={editOrganization}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          />
        </Box>
      </KeyboardAwareScrollView>
      <ImagePickerModal onClickImage={val => getImageUrl(val)} ref={sheetRef} />
      <OrganizationModal
        isModalVisible={organizationModalVisible}
        onBackdropPress={() =>
          setOrganizationModalVisible(!organizationModalVisible)
        }
      />
      <ErrorModal
        isModalVisible={isModalVisible}
        onCloseModal={() => setIsModalVisible(false)}
        localeID={errorMessage}
      />
    </Box>
  );
};
