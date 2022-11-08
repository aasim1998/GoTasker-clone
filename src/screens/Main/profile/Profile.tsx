import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Navbar} from 'molecules/Navbar';
import {ListItem} from 'molecules/ListItem';
import GlobalVariables, {
  editProfileIcon,
  profilePlaceholder,
  responseType,
  userRoleType,
} from 'utils/constant';
import useAuth from 'context/Authentication';
import {Image} from 'atoms/Image';
import {isAndroid} from 'utils/device';

export const Profile = ({navigation}) => {
  const {
    state: {userData},
  } = useAuth();
  const userInfo = userData[0]?.current_user?.role_list?.role;
  return (
    <Box flex={6} bg="primary">
      <Navbar
        title="profile.title"
        onRightClick={() => navigation.navigate(responseType.EditProfileScreen)}
        renderRight={userInfo === userRoleType.OWNER ? editProfileIcon : null}
      />
      <Box flex={0.8} bg="primary" alignItems="center" />
      <Box zIndex={100} flex={5.2} bg="lightBackground">
        <Box
          flex={isAndroid ? 1.7 : 1.3}
          alignItems="center"
          justifyContent="flex-end"
          pb="xm"
          width="100%">
          <Box
            height={150}
            mb="mXXL"
            position="absolute"
            zIndex={200}
            borderWidth={2}
            borderColor="greyish"
            bottom="5%"
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
                      uri: userData[0]?.current_user?.image_url,
                    }
              }
            />
          </Box>
          <Text color="black" variant="bold" fontSize={20} fontWeight="700">
            {`${userData[0]?.current_user?.first_name} ${userData[0]?.current_user?.last_name}`}
          </Text>
          <Text variant="greySubtitle">{`${userData[0]?.current_user?.email}`}</Text>
          <Text variant="greySubtitle">
            {`${userData[0]?.current_user?.phone_number}`}
          </Text>
        </Box>
        <Box flex={3.4}>
          <ListItem
            data={
              userInfo === userRoleType.OWNER
                ? GlobalVariables.dataProfile_Owner
                : userInfo === userRoleType.CLIENT
                ? GlobalVariables.dataProfile_Client
                : userInfo === userRoleType.SUBCONTRACTOR
                ? GlobalVariables.dataProfile_Subcontractor
                : userInfo === userRoleType.MANAGER
                ? GlobalVariables.dataProfile_Manager
                : null
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
