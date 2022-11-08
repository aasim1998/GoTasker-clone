import React, {useEffect} from 'react';
import {Box} from 'atoms/Box';
import {Row} from 'atoms/Row';
import {TextView} from 'atoms/TextView';
import {Image} from 'atoms/Image';
import {deviceHeight, deviceWidth, isIOS} from 'utils/device';
import {Touch} from 'atoms/Touch';
import {Button} from 'molecules/Button';
import ic_download_promo from '../../../assets/images/ic_download_promo.png';
import favourite from '../../../assets/images/favourite.png';
import share from '../../../assets/images/share.png';
import {ChipStatus} from 'atoms/ChipStatus';
import Share from 'react-native-share';
import {chipStatus, shareDetails, shareMessage} from 'utils/constant';
import {Navbar} from 'molecules/Navbar';
import useFeed from 'context/FeedAPI';
import {useRoute} from '@react-navigation/native';
import {Text} from 'atoms/Text';
import {Linking} from 'react-native';

export const FeedDetails = () => {
  const {
    actions: {feedsDetails},
    state: {feedDetailsItem, getFeedDetailsLoading},
  } = useFeed();
  const {id} = useRoute<any>().params;

  const formattedDate = feedDetailsItem[0]?.created_at
    .toLocaleString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('/');

  const myCustomShare = async () => {
    const shareOptions = {
      message: shareDetails.message(
        feedDetailsItem[0] ? feedDetailsItem[0].title : '',
        feedDetailsItem[0].promotion_url,
      ),
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };
  useEffect(() => {
    feedsDetails(id);
  }, []);

  return (
    <Box height="100%" bg="whiteText">
      <Navbar showBack title="detail.feeds" />
      <Row
        m="m"
        justifyContent="space-between"
        alignItems="center"
        mt={isIOS ? 'l' : 'm'}>
        <Image
          ml="-s"
          mr={isIOS ? '-xl' : '-mxxxl'}
          source={{
            uri: feedDetailsItem[0] ? feedDetailsItem[0].organization_logo : '',
          }}
          width={43 % -deviceHeight}
          height={40 % -deviceHeight}
          px="xs"
        />
        <Box>
          <Text
         
            fontWeight="bold"
            color="zBlack"
            fontSize={isIOS ? 16 % -deviceHeight : 15 % -deviceHeight}
            localeId={
              feedDetailsItem[0] ? feedDetailsItem[0].organization_name : ''
            }
            ml={isIOS ? '-mxxxl' : '-s'}
          />
          <Box flexDirection="row">
            <TextView
              color="greyText"
              mt={isIOS ? 'xs' : '-xxs'}
              variant="titleDescription"
              fontSize={isIOS ? 14 % -deviceHeight : 12 % -deviceHeight}
              ml={isIOS ? '-mxxxl' : '-s'}
              text={'posted.on.date'}
            />
            <Text
            
              ml="xxs"
              color="greyText"
              mt={isIOS ? 'xs' : '-xxs'}
              variant="titleDescription"
              fontSize={isIOS ? 14 % -deviceHeight : 12 % -deviceHeight}>
              {formattedDate}
            </Text>
          </Box>
        </Box>
        <Box ml="l">
          <Row>
            <Touch mt={isIOS ? 's' : 'm'} mr="xxs">
              <Image
                source={ic_download_promo}
                width={isIOS ? 21 : 19}
                height={isIOS ? 21 : 19}
              />
            </Touch>
            <Touch mt={isIOS ? 'xs' : 's'} mr="xxs">
              <Image
                bg="icontWhite"
                source={favourite}
                width={isIOS ? 33 : 32}
                height={isIOS ? 29 : 33}
              />
            </Touch>
            <Touch mt={isIOS ? 's' : 'm'} mr="-s" onPress={myCustomShare}>
              <Image
                source={share}
                width={isIOS ? 21 : 19}
                height={isIOS ? 21 : 19}
              />
            </Touch>
          </Row>
        </Box>
      </Row>

      <Image
        source={{uri: feedDetailsItem[0] ? feedDetailsItem[0].avatar : ''}}
        height="30%"
        width="100%"
      />

      <Box ml="s" mt="m">
        <Row>
          <Box width={isIOS ? '61%' : '60%'}>
            <Text
              fontWeight="bold"
              color="zBlack"
              fontSize={isIOS ? 18 : 16}
              localeId={feedDetailsItem[0] ? feedDetailsItem[0].title : ''}
            />
          </Box>
          <Box
            mx={isIOS ? 'xl' : 's'}
            alignItems="center"
            justifyContent="center">
            <ChipStatus
              text={
                feedDetailsItem[0]?.approved === chipStatus.pending
                  ? chipStatus.underReview
                  : feedDetailsItem[0]?.approved
              }
              color="lightingYellow"
            />
          </Box>
        </Row>

        <TextView
          mt="s"
          fontWeight="bold"
          color="zBlack"
          fontSize={isIOS ? 18 : 16}
          text="detail.description"
        />
      </Box>

      <Box width={deviceWidth - 50}>
        <Text
          mt="s"
          color="darkGreyText"
          mb="m"
          numberOfLines={3}
          ellipsizeMode="tail"
          fontSize={isIOS ? 18 : 16}
          localeId={feedDetailsItem[0] ? feedDetailsItem[0].description : ''}
          ml="s"
        />
      </Box>

      <Box mr={isIOS ? 'sl' : 'xm'} ml="s" mt="s">
        <Touch
          onPress={() => Linking.openURL(feedDetailsItem[0].promotion_url)}>
          <Button
            title="title.visit.website"
            variant={isIOS ? 'primary-bold' : 'primary-large'}
            backgroundColor="lightingYellow"
            borderColor="lightingYellow"
          />
        </Touch>
      </Box>
    </Box>
  );
};
