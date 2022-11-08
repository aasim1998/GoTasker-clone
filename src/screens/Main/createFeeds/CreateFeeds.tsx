import React from 'react';
import {Box} from 'atoms/Box';
import {ListFeedsForm} from './organism/CreateFeedsForm';
import {deviceHeight} from 'utils/device';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useFeed from 'context/FeedAPI';
import {createFeedsType} from 'typings/createFeeds.type';
import {Navbar} from 'molecules/Navbar';
import {Platform} from 'react-native';
import GlobalVariables from 'utils/constant';

export const CreateFeeds = ({navigation}) => {
  const {
    actions: {createFeeds},
  } = useFeed();

  const handleSubmit = async (values: createFeedsType) => {
    const formdata = new FormData();
    formdata.append('promotion[title]', values.feedTitle);
    formdata.append('promotion[description]', values.feedSummary);
    formdata.append('promotion[start_date]', values.startDate);
    formdata.append('promotion[end_date]', values.endDate);
    formdata.append('promotion[promotion_category]', values.feedCategory);
    formdata.append('promotion[promotion_url]', values.feedUrl);
    formdata.append('promotion[avatar]', {
      uri:
        Platform.OS === 'android'
          ? values.uploadImage.sourceURL
          : values.uploadImage.sourceURL.replace('file://', ''),
      name: values.uploadImage.filename,
      type: values.uploadImage.mime,
    });
    await createFeeds(formdata);
    navigation.navigate('ListFeeds');
  };
  const initialValues = {
    feedTitle: '',
    feedSummary: '',
    feedUrl: '',
    feedCategory: GlobalVariables.categoryList[0].name,
    startDate: '',
    endDate: '',
  };

  return (
    <Box
      height="100%"
      style={{paddingBottom: Platform.OS === 'ios' ? 110 : 70}}>
      <Navbar
        showBack
        title="title.create.feed"
        renderRight="information-outline"
      />
      <Box height="100%" backgroundColor="lightBackground">
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid>
          <Box
            mx="m"
            mt={deviceHeight < 780 ? 'ml' : 'xs'}
            justifyContent="flex-end">
            <ListFeedsForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              loading={false}
            />
          </Box>
        </KeyboardAwareScrollView>
      </Box>
    </Box>
  );
};
