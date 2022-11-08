import React from 'react';
import {Box} from 'atoms/Box';
import {EditFeedsForm} from './organism/EditFeedsForm';
import {deviceHeight} from 'utils/device';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {editFeedsType} from 'typings/editFeeds.type';
import {Navbar} from 'molecules/Navbar';
import {Platform} from 'react-native';
import useAuth from 'context/Authentication';
import GlobalVariables from 'utils/constant';

export const EditFeeds = () => {
  const {
    actions: {changeLanguage},
  } = useAuth();

  const handleSubmit = async (values: editFeedsType) => {};

  const initialValues = {
    feedTitle: '',
    feedSummary: '',
    feedUrl: '',
    feedCategory: GlobalVariables.categoryList[0].name,
    startDate: '',
    endDate: '',
    uploadImage: '',
  };

  return (
    <Box
      height="100%"
      style={{paddingBottom: Platform.OS === 'ios' ? 110 : 70}}>
      <Navbar showBack title="title.update.feed" />
      <Box height="100%" backgroundColor="lightBackground">
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid>
          <Box
            mx="m"
            mt={deviceHeight < 780 ? 'ml' : 'xs'}
            justifyContent="flex-end">
            <EditFeedsForm
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
