import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import useFeed from 'context/FeedAPI';
import {TextAPI} from 'atoms/TextAPI';

export const SavedFeeds = () => {
  const {
    actions: {getSavedFeeds},
    state: {savedFeedsList},
  } = useFeed();

  useEffect(() => {
    getSavedFeeds();
  }, []);
  return (
    <Box position="absolute" width="100%" bg="whiteText" height="100%">
      <Navbar title="saved.feeds" />
      <Box flex={1} justifyContent="center" top={5}>
        <TextAPI
          textAlign="center"
          variant="bold"
          color="black"
          fontWeight="700"
          text={savedFeedsList.success_message}
          fontSize={18}
        />
      </Box>
    </Box>
  );
};
