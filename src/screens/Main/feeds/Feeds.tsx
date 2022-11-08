import React, {useState} from 'react';
import useAuth from '../../../context/Authentication';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {navigate} from 'services/NavigationService';
import {TextView} from 'atoms/TextView';
import {FeedsModal} from 'molecules/Feedsmodal';
import {isIOS} from 'utils/device';
import {userRoleType} from 'utils/constant';

export const Feeds = () => {
  const {
    actions: {changeLanguage},
    state: {userData},
  } = useAuth();

  const button = userData[0]?.current_user?.role_list?.role;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Box bg="whiteText" height="120%" flex={1}>
      <Navbar title="title.feeds" renderRight="menu" onRightClick={openModal} />
      {button === userRoleType.OWNER ? (
        <Touch
          shadowOpacity={0.4}
          position="absolute"
          bottom={isIOS ? 40 : 10}
          right={20}
          height={50}
          width={50}
          borderRadius={25}
          bg="primary"
          justifyContent="center"
          alignItems="center">
          <Icon
            name="add"
            color={theme.colors.white}
            size={30}
            onPress={() => navigate('CreateFeeds')}
          />
        </Touch>
      ) : null}
      <FeedsModal
        visible={isModalVisible}
        onCloseModal={closeModal}
        routeName={'ListFeeds'}
        routeName2={'SavedFeeds'}
        postedByMe={'feed.posted.me'}
        SavedFeeds={'saved.feeds'}
      />

      <Box top="40%" justifyContent="center" alignItems="center">
        <TextView
          textAlign="center"
          variant="bold"
          color="black"
          fontWeight="700"
          text="no.feeds.found"
          fontSize={18}
        />
      </Box>
    </Box>
  );
};
