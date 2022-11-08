import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {navigate} from 'services/NavigationService';
import useFeed from 'context/FeedAPI';
import {TextAPI} from 'atoms/TextAPI';
import {FeedsModal} from 'molecules/Feedsmodal';
import {isIOS} from 'utils/device';

export const OthersFeeds = () => {
  const {
    actions: {getOthersFeeds},
    state: {othersFeedsList},
  } = useFeed();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getOthersFeeds();
  }, []);

  return (
    <Box bg="whiteText" height="120%" flex={1}>
      <Navbar title="title.feeds" renderRight="menu" onRightClick={openModal} />

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
      <FeedsModal
        visible={isModalVisible}
        onCloseModal={closeModal}
        routeName={'ListFeeds'}
        routeName2={'SavedFeeds'}
        postedByMe={'feed.posted.me'}
        SavedFeeds={'saved.feeds'}
      />

      <Box top="40%" justifyContent="center" alignItems="center">
        <TextAPI
          textAlign="center"
          variant="bold"
          color="black"
          fontWeight="700"
          text={othersFeedsList.success_message}
          fontSize={18}
        />
      </Box>
    </Box>
  );
};
