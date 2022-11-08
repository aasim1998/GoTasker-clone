import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {Touch} from 'atoms/Touch';
import {Icon} from 'atoms/Icon';
import theme from 'styles/theme';
import {navigate} from 'services/NavigationService';
import {TextView} from 'atoms/TextView';
import {FeedListItem} from 'molecules/FeedListItem';
import useFeed from 'context/FeedAPI';
import {ScrollView} from 'react-native-gesture-handler';
import {FeedsModal} from 'molecules/Feedsmodal';
import {isIOS} from 'utils/device';

export const ListFeeds = () => {
  const {
    actions: {getFeeds},
    state: {feedList, getFeedsLoading},
  } = useFeed();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getFeeds();
  }, []);

  return (
    <Box height="100%" bg="whiteText" flex={1}>
      <Navbar title="title.feeds" renderRight="menu" onRightClick={openModal} />

      <TextView
        mt="s"
        ml="m"
        fontWeight="bold"
        fontSize={isIOS ? 19 : 15}
        text="list.feeds"
        color="black"
      />
      <ScrollView>
        <FeedListItem data={feedList[0]?.promotions} />
      </ScrollView>

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
        routeName={'OthersFeeds'}
        postedByMe={'feed.posted.others'}
        SavedFeeds={'saved.feeds'}
        routeName2={'SavedFeeds'}
      />
    </Box>
  );
};
